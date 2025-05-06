import { useNavigate } from "react-router-dom";

interface SongCardProps {
  songName: string;
  artistName: string;
  imageUrl: string;
  lyricsPath: string;
}

export default function SongCard({
  songName,
  artistName,
  imageUrl,
  lyricsPath,
}: SongCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    const path = `/lyrics${lyricsPath}`;
    navigate(path);
  }

  return (
    <a
      key={songName}
      onClick={handleClick}
      className="flex border-gray-600 border-1 rounded-3xl hover:cursor-pointer hover:bg-black/5"
    >
      <div className="w-full h-full p-8 flex flex-col align-middle justify-between">
        <h3 className="w-full text-xl font-bold">{songName}</h3>
        <p className="text-l">{artistName}</p>
      </div>
      <img
        src={imageUrl}
        alt={songName}
        className="aspect-square h-42 rounded-r-3xl"
      />
    </a>
  );
}
