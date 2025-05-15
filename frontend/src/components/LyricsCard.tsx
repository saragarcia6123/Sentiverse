interface LyricsCardProps {
  lyrics: string;
}

export default function LyricsCard({ lyrics }: LyricsCardProps) {
  const sections: string[] = lyrics.split("\n\n");

  return (
    <div className="w-fit py-6 px-12 bg-indigo-950/70 text-white/90 dark:bg-indigo-950/50 rounded-xl shadow-lg">
      {sections.map((section: string, id: number) => (
        <LyricSection key={`section-${id}`} content={section} />
      ))}
    </div>
  );
}

function LyricSection({ content }: { content: string }) {
  const lines: string[] = content.split("\n");

  return (
    <div className="my-4">
      {lines.map((line: string, id: number) => (
        <p key={`line-${id}`} className="w-fit">
          {line}
        </p>
      ))}
    </div>
  );
}
