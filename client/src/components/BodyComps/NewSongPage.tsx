import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SongService from "../../services/SongService";
import keysArray from "../../static/keys-array";
import signaturesArray from "../../static/signatures-array";

const NewSongPage = () => {
  const { eventId } = useParams();

  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [key, setKey] = useState<string>(keysArray[0]);
  const [tempo, setTempo] = useState<number>(120);
  const [signature, setSignature] = useState<string>(signaturesArray[0]);
  const [mod, setMod] = useState<string>("мажор");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();

  const setTempoHandler = (value: string) => {
    if (isNaN(+value)) setTempo(120);
    else if (+value > 400) setTempo(400);
    else if (+value < 0) setTempo(0);
    else setTempo(+value);
  };

  const createHandler = () => {
    if (name?.length! > 0 && author?.length! > 0) {
      SongService.newSong(
        eventId!,
        name,
        author,
        `${key} ${mod}`,
        tempo,
        signature
      );
      navigate(`/event/${eventId}`);
    } else setErrorMessage("Всі поля мають бути заповненими");
  };

  return (
    <div className="bg-gray-100 flex justify-center p-4">
      <div className="bg-white rounded drop-shadow flex flex-col gap-4 p-4">
        <div className="text-center text-xl">створення нової пісні</div>
        <div className="flex justify-center gap-10 p-2">
          <div className="flex gap-2">
            <label>Назва:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage(undefined);
              }}
              className="border-gray-300 border-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <label>Автор:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                setErrorMessage(undefined);
              }}
              className="border-gray-300 border-2 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between gap-10 p-2">
          <div className="flex gap-2">
            <label>Тональність:</label>
            <select
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="border-2 rounded border-gray-300"
            >
              {keysArray.map((key: string) => {
                return <option value={key}>{key}</option>;
              })}
            </select>
            {key != keysArray[keysArray.length - 1] && (
              <select
                value={mod}
                onChange={(e) => {
                  setMod(e.target.value);
                }}
                className="border-2 border-gray-300 rounded px-2"
              >
                <option value="мажор">мажор</option>
                <option value="мінор">мінор</option>
              </select>
            )}
          </div>
          <div className="flex gap-2">
            <label>Темп:</label>
            <input
              type="text"
              value={tempo}
              onChange={(e) => setTempoHandler(e.target.value)}
              className="border-gray-300 border-2 rounded px-2"
            />
          </div>
          <div className="flex gap-2">
            <label>Розмір:</label>
            <select
              value={signature!}
              onChange={(e) => setSignature(e.target.value)}
              className="border-2 border-gray-300 rounded px-2"
            >
              {signaturesArray.map((signature: string) => {
                return (
                  <option value={signaturesArray.indexOf(signature)}>
                    {signature}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col text-center text-red-500">
          {errorMessage!}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-cyan-500 rounded p-2 drop-shadow hover:bg-cyan-300"
            onClick={createHandler}
          >
            створити
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSongPage;
