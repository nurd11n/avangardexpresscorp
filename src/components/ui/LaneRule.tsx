import { InView } from '@/components/ui/InView';

/** The signature separator: a 2px dashed highway skip line, full container width. */
export function LaneRule() {
  return (
    <div className="mx-auto w-full max-w-site px-6" aria-hidden="true">
      <InView className="lane-rule" />
    </div>
  );
}
