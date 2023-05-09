import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../..";
import { IEvent, IParticipant } from "../../models/IEvent";
import { ISong } from "../../models/ISong";
import SongService from "../../services/SongService";
import keysArray from "../../static/keys-array";
import signaturesArray from "../../static/signatures-array";
import EditButton from "./UserAccountPageComps/EditButton";
import ExtraInput from "./UserAccountPageComps/ExtraForm";
import FileUploader from "./UserEventsPageComps/UserAvatarUploader";
import { ImCross } from "react-icons/im";
import { API_URL } from "../../http";

const SongPage = () => {
  const { songId } = useParams();
  const { store } = useContext(Context);

  const [editMode, setEditMode] = useState<boolean>(false);

  type fileData = {
    file: string;
    desc: string;
  };

  const url = API_URL!.replace("/api", "");
  const [name, setName] = useState<string>();
  const [tempo, setTempo] = useState<number>();
  const [author, setAuthor] = useState<string>();
  const [signature, setSignature] = useState<string>();
  const [key, setKey] = useState<string>();
  const [mod, setMod] = useState<string>();
  const [event, setEvent] = useState<IEvent>();
  const [pdf, setPdf] = useState<File>();
  const [desc, setDesc] = useState<string>();
  const [audioDesc, setAudioDesc] = useState<string>();
  const [pdfs, setPdfs] = useState<fileData[]>([]);
  const [audio, setAudio] = useState<fileData[]>([]);
  const [audioFile, setAudioFile] = useState<File>();
  const [lyrics, setLyrics] = useState<string>();

  const addPdfHandler = async () => {
    await SongService.putPdf(pdf!, songId!, desc!);
    window.location.reload();
  };

  const addAudioHandler = async () => {
    await SongService.putAudio(audioFile!, songId!, audioDesc!);
    window.location.reload();
  };

  const setTempoHandler = (value: string) => {
    if (isNaN(+value)) setTempo(120);
    else if (+value > 400) setTempo(400);
    else if (+value < 0) setTempo(0);
    else setTempo(+value);
  };

  const deletePdfHandler = (index: number) => {
    if (window.confirm(`ви дійсно хочете видалити цей файл?`)) {
      SongService.deletePdf(songId!, index);
      window.location.reload();
    }
  };

  const deleteAudioHandler = (index: number) => {
    if (window.confirm(`ви дійсно хочете видалити цей файл?`)) {
      SongService.deleteAudio(songId!, index);
      window.location.reload();
    }
  };

  const updateHandler = async () => {
    await SongService.update(
      songId!,
      name!,
      author!,
      `${key} ${mod}`,
      tempo!,
      signature!,
      lyrics!
    );
  };

  const getData = () => {
    SongService.getById(songId!).then((res) => {
      setName(res.data.name);
      setTempo(res.data.tempo);
      setSignature(res.data.signature);
      setKey(res.data.key.split(" ")[0]);
      setMod(res.data.key.split(" ")[1]);
      setEvent(res.data.event);
      setSignature(res.data.signature);
      setPdfs(res.data.pdf);
      setAuthor(res.data.author);
      setAudio(res.data.audio);
      setLyrics(res.data.lyrics);
    });
  };
  useEffect(() => {
    if (songId) getData();
  }, [songId]);

  return (
    <div className="bg-gray-100 p-4 flex flex-col gap-2">
      <div className="bg-white rounded drop-shadow flex justify-center p-4">
        <div className="text-center text-2xl">
          <ExtraInput value={name!} setValue={setName} editMode={editMode} />
        </div>
        <div className="absolute right-0 mr-6 mt-1">
          {(store.user._id == event?.creatorId ||
            event?.participants.some((participant: IParticipant) => {
              return (
                participant._id == store.user._id && participant.rights <= 2
              );
            })) && (
            <EditButton value={editMode} setValue={setEditMode} size={25} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
          <div className="flex gap-2">
            Тональність:
            {(editMode && (
              <div className="flex gap-2">
                <select value={key} onChange={(e) => setKey(e.target.value)}>
                  {keysArray.map((key: string) => {
                    return <option value={key}>{key}</option>;
                  })}
                </select>
                {key != "змінна" && (
                  <select value={mod} onChange={(e) => setMod(e.target.value)}>
                    <option className="мажор">мажор</option>
                    <option className="мажор">мінор</option>
                  </select>
                )}
              </div>
            )) || <div>{`${key} ${mod}`}</div>}
          </div>
          <div className="flex gap-2">
            Темп:{" "}
            <ExtraInput
              value={tempo?.toString()!}
              setValue={setTempoHandler}
              editMode={editMode}
            />
          </div>
          <div className="flex gap-2">
            Розмір:
            {(editMode && (
              <select
                value={signature}
                onChange={(e) => {
                  setSignature(e.target.value);
                }}
              >
                {signaturesArray.map((signature: string) => {
                  return <option value={signature}>{signature}</option>;
                })}
              </select>
            )) || <div>{signature}</div>}
          </div>
          <div className="flex gap-2">
            <label>автор: </label>
            <ExtraInput
              value={author!}
              setValue={setAuthor}
              editMode={editMode}
            />
          </div>
        </div>
        <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-2">
          <div className="text-center font-bold">pdf - файли:</div>
          <div className="flex flex-col gap-2 overflow-auto">
            {pdfs!.map((file: fileData) => {
              return (
                <div className="bg-cyan-500 hover:bg-cyan-300 rounded py-1 px-3 drop-shadow flex justify-between">
                  <a href={`${url}/${file.file}`}>
                    <div>{file.desc}</div>
                  </a>
                  {editMode && (
                    <ImCross
                      onClick={() => {
                        deletePdfHandler(pdfs.indexOf(file));
                      }}
                      color="red"
                      className="mt-1"
                    />
                  )}
                </div>
              );
            })}
            {pdfs.length == 0 && (
              <div className="text-gray-500 text-center col-span-2 pt-6">
                файлів нема
              </div>
            )}
          </div>
          {editMode && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <FileUploader
                  display={true}
                  setFile={setPdf}
                  accept=".pdf"
                  className="w-52"
                />
              </div>
              <label>коментар до файлу:</label>
              <input
                className="border-2 border-gray-300 rounded p-1"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-300 rounded p-2"
                  onClick={addPdfHandler}
                >
                  додати файл
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-2">
          <div className="text-center font-bold">аудіо - файли:</div>
          <div className="flex flex-col gap-2 overflow-auto">
            {audio!.map((file: fileData) => {
              return (
                <div className="bg-cyan-500 hover:bg-cyan-300 rounded py-1 px-3 drop-shadow flex justify-between">
                  <a href={`${url}/${file.file}`}>
                    <div>{file.desc}</div>
                  </a>
                  {editMode && (
                    <ImCross
                      onClick={() => {
                        deleteAudioHandler(audio.indexOf(file));
                      }}
                      color="red"
                      className="mt-1"
                    />
                  )}
                </div>
              );
            })}
            {audio.length == 0 && (
              <div className="text-gray-500 text-center col-span-2 pt-6">
                файлів нема
              </div>
            )}
          </div>
          {editMode && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <FileUploader
                  display={true}
                  setFile={setAudioFile}
                  accept=".mp3, .wav, .flac"
                  className="w-52"
                />
              </div>
              <label>коментар до файлу:</label>
              <input
                className="border-2 border-gray-300 rounded p-1"
                type="text"
                value={audioDesc}
                onChange={(e) => setAudioDesc(e.target.value)}
              />
              <div className="flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-300 rounded p-2"
                  onClick={addAudioHandler}
                >
                  додати файл
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white rounded drop-shadow p-4 w-1/2 flex flex-col gap-2">
          <div className="text-center font-bold">слова:</div>
          <div className="flex justify-center">
            <textarea
              className="border-2 border-gray-200 rounded w-full h-72 text-center"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>
      {editMode && (
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-green-400 hover:bg-green-200 p-1 rounded drop-shadow"
            onClick={() => {
              updateHandler();
              window.location.reload();
            }}
          >
            застосувати зміни
          </button>
        </div>
      )}
    </div>
  );
};

export default SongPage;
