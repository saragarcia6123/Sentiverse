interface LyricsCardProps {
  lyrics: string;
}

export default function LyricsCard({ lyrics }: LyricsCardProps) {
  const sections: string[] = lyrics.split("\n\n");

  return (
    <div>
      {sections.map((section: string, id: number) => (
        <LyricSection key={id} content={section} />
      ))}
    </div>
  );
}

function LyricSection({ content }: { content: string }) {
  const lines: string[] = content.split("\n");

  return (
    <div className="my-4">
      {lines.map((line: string) => (
        <p>{line}</p>
      ))}
    </div>
  );
}
