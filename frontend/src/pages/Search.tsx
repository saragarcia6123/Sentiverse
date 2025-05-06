import { useQuery } from "@apollo/client";
import { GET_SONG_MATCHES } from "../queries";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

type SongMatch = {
  songName: string;
  artistName: string;
  imageUrl: string;
};

export default function Search() {
  const [searchParams] = useSearchParams();

  const songQuery = searchParams.get("song");
  const artistQuery = searchParams.get("artist");

  const { loading, error, data } = useQuery(GET_SONG_MATCHES, {
    variables: {
      songQuery: songQuery || "",
      artistQuery: artistQuery || "",
      limit: 5,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error name={error.name} message={error.message} />;

  const { querySong } = data;

  return (
    <div id="pageSearch" className="w-full flex justify-center">
      {querySong.length === 0 ? (
        <div>Please enter a search term in the URL</div>
      ) : (
        <div className="flex flex-col gap-8 m-2 max-w-xl">
          {querySong.map((song: SongMatch) => (
            <div
              key={song.songName}
              className="flex border-gray-600 border-1 rounded-3xl"
            >
              <div className="w-full h-full p-8 flex flex-col align-middle justify-between">
                <h3 className="w-full text-xl font-bold">{song.songName}</h3>
                <p className="text-l">{song.artistName}</p>
              </div>
              <img
                src={song.imageUrl}
                alt={song.songName}
                className="aspect-square h-42 rounded-r-3xl"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
