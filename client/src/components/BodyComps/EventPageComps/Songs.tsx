import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ISong } from "../../../models/ISong";
import SongService from "../../../services/SongService";

type LocalParams = {
  eventId: string;
  className?: string;
};

const Songs = ({ eventId, className }: LocalParams) => {
  const [songs, setSongs] = useState<ISong[]>([]);

  const getData = () => {
    SongService.getEventSongs(eventId).then((res) => setSongs(res.data));
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  return (
    <div className={className}>
      {songs!.map((song: ISong) => {
        return (
          <Link
            to={`/song/${song._id}`}
            className="bg-cyan-500 hover:bg-cyan-300 rounded drop-shadow py-2 px-4"
          >
            <div className="text-center text-white">{song.name}</div>
            <div className="text-center text-white">{song.author}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Songs;
