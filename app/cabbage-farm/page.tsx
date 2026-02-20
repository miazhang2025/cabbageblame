import CabbageFarm from '@/components/CabbageFarm';

export default function CabbageFarmPage() {
  return (
    <main className="w-full">
      <CabbageFarm />
      {/* Extra padding at bottom for fixed footer */}
      <div className="h-16" />
    </main>
  );
}
