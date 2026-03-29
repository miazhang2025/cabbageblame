'use client';

import dynamic from 'next/dynamic';

const Grainient = dynamic(() => import('./Grainient'), { ssr: false });

interface GrainientLoaderProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function GrainientLoader(props: GrainientLoaderProps) {
  return <Grainient {...props} />;
}
