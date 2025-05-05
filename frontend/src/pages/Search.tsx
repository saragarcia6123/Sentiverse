import { useQuery } from "@apollo/client";
import { GET_SONG_MATCHES } from "../queries";
import { useSearchParams } from "react-router-dom";

type SongMatch = {
  songName: string;
  artistName: string;
  imageUrl: string;
};

export default function Search() {
  const [searchParams] = useSearchParams();

  const songQuery = searchParams.get("song");
  const artistQuery = searchParams.get("artist");

  console.log(songQuery, artistQuery);

  const { loading, error, data } = useQuery(GET_SONG_MATCHES, {
    variables: {
      songQuery: songQuery || "",
      artistQuery: artistQuery || "",
      limit: 5,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { querySong } = data;

  return (
    <div id="page-search" className="w-full flex justify-center">
      {querySong.length === 0 ? (
        <div>Please enter a search term in the URL</div>
      ) : (
        <div className="flex flex-col gap-8 m-2 max-w-xl">
          {querySong.map((song: SongMatch) => (
            <div
              key={song.songName}
              className="flex border-gray-600 border-1 rounded-3xl"
            >
              <div className="w-full p-8">
                <h3 className="w-full text-2xl font-bold">{song.songName}</h3>
                <p className="text-xl">{song.artistName}</p>
              </div>
              <img
                src={song.imageUrl}
                alt={song.songName}
                className="aspect-square h-48 rounded-r-3xl"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
