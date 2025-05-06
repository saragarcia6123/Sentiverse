interface SongCardProps {
  songName: string;
  artistName: string;
  imageUrl: string;
}

export default function SongCard({
  songName,
  artistName,
  imageUrl,
}: SongCardProps) {
  return (
    <div key={songName} className="flex border-gray-600 border-1 rounded-3xl">
      <div className="w-full h-full p-8 flex flex-col align-middle justify-between">
        <h3 className="w-full text-xl font-bold">{songName}</h3>
        <p className="text-l">{artistName}</p>
      </div>
      <img
        src={imageUrl}
        alt={songName}
        className="aspect-square h-42 rounded-r-3xl"
      />
    </div>
  );
}
