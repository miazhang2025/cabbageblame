'use client';

import { useEffect, useRef } from 'react';

interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  grainAmount?: number;
  speed?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

const vertexShader = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uGrainAmount;
uniform float uSpeed;

out vec4 fragColor;

mat2 Rot(float a){ float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }

vec2 hash(vec2 p){
  p = vec2(dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)));
  return fract(sin(p)*43758.5453);
}

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  float n = mix(
    mix(dot(-1.0+2.0*hash(i+vec2(0,0)), f-vec2(0,0)),
        dot(-1.0+2.0*hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
    mix(dot(-1.0+2.0*hash(i+vec2(0,1)), f-vec2(0,1)),
        dot(-1.0+2.0*hash(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
  return 0.5 + 0.5*n;
}

void main(){
  float t = iTime * uSpeed;
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;

  vec2 tuv = uv - 0.5;
  tuv.y *= 1.0/ratio;

  float degree = noise(vec2(t*0.1, tuv.x*tuv.y)*2.0);
  tuv *= Rot(radians((degree-0.5)*500.0 + 180.0));
  tuv.y *= ratio;

  tuv.x += sin(tuv.y*5.0 + t*2.0)/50.0;
  tuv.y += sin(tuv.x*7.5 + t*2.0)/25.0;

  float blendX = (tuv * Rot(radians(0.0))).x;
  vec3 layer1 = mix(uColor3, uColor2, smoothstep(-0.5, 0.3, blendX));
  vec3 layer2 = mix(uColor2, uColor1, smoothstep(-0.5, 0.3, blendX));
  vec3 col = mix(layer1, layer2, smoothstep(0.5, -0.5, tuv.y));

  // Grain
  vec2 grainUv = uv * 2.0 + vec2(t*0.05);
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233)))*43758.5453);
  col += (grain - 0.5) * uGrainAmount;

  col = (col - 0.5) * 1.4 + 0.5;
  col = clamp(col, 0.0, 1.0);
  fragColor = vec4(col, 1.0);
}`;

export default function Grainient({
  color1 = '#abadc4',
  color2 = '#2e06cb',
  color3 = '#5a42a9',
  grainAmount = 0.12,
  speed = 0.25,
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      // WebGL2 not available — just keep solid bg
      container.removeChild(canvas);
      return;
    }

    function compileShader(type: number, src: string): WebGLShader {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const vert = compileShader(gl.VERTEX_SHADER, vertexShader);
    const frag = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, 'iResolution');
    const uTime = gl.getUniformLocation(prog, 'iTime');
    const uC1   = gl.getUniformLocation(prog, 'uColor1');
    const uC2   = gl.getUniformLocation(prog, 'uColor2');
    const uC3   = gl.getUniformLocation(prog, 'uColor3');
    const uGrain = gl.getUniformLocation(prog, 'uGrainAmount');
    const uSpd  = gl.getUniformLocation(prog, 'uSpeed');

    gl.uniform3fv(uC1, hexToRgb(color1));
    gl.uniform3fv(uC2, hexToRgb(color2));
    gl.uniform3fv(uC3, hexToRgb(color3));
    gl.uniform1f(uGrain, grainAmount);
    gl.uniform1f(uSpd, speed);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = Math.max(1, Math.floor(container!.clientWidth * dpr));
      const h = Math.max(1, Math.floor(container!.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const t0 = performance.now();
    let raf = 0;
    function loop(ts: number) {
      gl!.uniform1f(uTime, (ts - t0) * 0.001);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      try { container.removeChild(canvas); } catch { /* ignore */ }
    };
  }, [color1, color2, color3, grainAmount, speed]);

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />;
}
