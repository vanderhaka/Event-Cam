import dynamic from 'next/dynamic';

const NewEventStepContent = dynamic(
  () => import('./NewEventStepContent'),
  { ssr: false }
);

export default function NewEventStepPage() {
  return <NewEventStepContent />;
}
