import { CreateEventProvider } from './create-event-context';

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <CreateEventProvider>{children}</CreateEventProvider>;
}
