'use client';

import { useParams } from 'next/navigation';
import TaggedNotes from '@/components/layout/TaggedNotes';

const TagPage = () => {
  const { tag } = useParams() as { tag: string };

  return (
    <div className="lg:hidden">
      <TaggedNotes tag={tag} />
    </div>
  );
};

export default TagPage;
