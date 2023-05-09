import React, { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import IRoute from "../../interfaces/route";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import EventService from "../../services/EventService";
import { API_URL } from "../../http";
import ArrayMapper from "../UniversalComps/ArrayMapper";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";

export const AddEventForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [participants, setParticipants] = useState<Array<string>>([]);
  const [rider, setRider] = useState<string>("");
  const [musiciansNeeded, setMusiciansNeeded] = useState<Array<string>>([]);
  const [musicianNeeded, setMusicianNeeded] = useState<string>("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [genre, setGenre] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date("Sept 24, 22 13:20:18"));
  const [adress, setAdress] = useState<string>("");
  const [avatar, setAvatar] = useState<File>(new File(["none"], "none"));

  const navigate = useNavigate();
  const url = API_URL!.replace("/api", "");

  const { store } = useContext(Context);
  const newEventHandler = async () => {
    try {
      await EventService.createEvent(
        name,
        store.user._id,
        desc,
        rider,
        genres,
        date,
        adress,
        avatar,
        musiciansNeeded
      );
      navigate("/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col py-6">
      <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded drop-shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">
            Створення музичної події
          </h1>

          <div className="flex justify-center flex-col">
            <div className="flex justify-center">
              <ImgDisplayer src={URL.createObjectURL(avatar)} />
            </div>
            <div className="flex justify-center mt-3">
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) return;
                  const file = files[0];
                  if (!file) return;
                  setAvatar(file);
                }}
              />
            </div>
          </div>

          <label>Назва: </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Назва"
          />

          <form>
            <label>Жанри: </label>

            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fenre"
              placeholder="Жанр"
            />

            <div className="flex flex-row gap-2">
              <ArrayMapper
                array={genres}
                className="flex gap-2 overflow-auto"
                itemClassName="bg-gray-200 px-2 py-1 rounded drop-shadow"
              />
            </div>

            <div className="py-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  setGenres(genres.concat(genre));
                  setGenre("");
                }}
              >
                Додати...
              </button>
            </div>
          </form>

          <DatePicker
            className="block border border-grey-light w-full p-3 rounded mb-4"
            selected={date}
            onChange={(date: Date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />

          <form>
            <label>Які музиканти потрібні: </label>

            <input
              value={musicianNeeded}
              onChange={(e) => setMusicianNeeded(e.target.value)}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fenre"
              placeholder="Учасник"
            />

            <div className="flex flex-row gap-2">
              <ArrayMapper
                array={musiciansNeeded}
                className="flex gap-2 overflow-auto"
                itemClassName="bg-gray-200 px-2 py-1 rounded drop-shadow flex gap-2"
              />
            </div>

            <div className="py-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  setMusiciansNeeded(musiciansNeeded.concat(musicianNeeded));
                  setMusicianNeeded("");
                }}
              >
                Додати...
              </button>
            </div>
          </form>

          <input
            onChange={(e) => setAdress(e.target.value)}
            value={adress}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="cell"
            placeholder="Адреса"
          />

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="desc"
            placeholder="Опис"
          />

          <textarea
            onChange={(e) => setRider(e.target.value)}
            value={rider}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="rider"
            placeholder="Технічний райдер"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 focus:outline-none my-1"
            onClick={() => newEventHandler()}
          >
            Додати подію
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
