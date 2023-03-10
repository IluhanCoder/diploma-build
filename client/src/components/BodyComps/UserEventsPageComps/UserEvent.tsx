import React, { FC, useContext, useState } from "react";
import { IEvent } from "../../../models/IEvent";
import { useNavigate } from "react-router";
import { arrayBuffer } from "stream/consumers";
import $api from "../../../http";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import EventService from "../../../services/EventService";
import { BiSearch } from "react-icons/bi";

export const Event: FC = (props: any) => {
  const event: IEvent = props[0];

  return (
    <div className="bg-white border-gray-300 border-2 rounded-md md:px-24 px-2 py-6 mb-4">
      <div className="grid grid-rows-8">
        <div className="flex md:place-content-end place-content-center">
          <h2>Створив подію: {event.creator}</h2>
        </div>
        <div className="flex justify-center">
          <h1 className="font-bold text-4xl">{event.name}</h1>
        </div>
        <div className="row-span-2 lg:px-1/4 flex justify-center content-center py-4">
          <img
            src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
            className="h-full"
          ></img>
        </div>
        <div>
          <div className="mt-4 mb-6 mx-2">
            <p>{event.desc}</p>
          </div>
        </div>
        <div className="row-span-3">
          <div className="grid md:grid-cols-2 sm:grid-rows-2">
            <div>
              <p className="mb-2">Жанри:</p>
              <div className="flex flex-wrap">
                {event.genres.map((genre) => {
                  return (
                    <div className="bg-gray-400 mr-4 mb-2 rounded">
                      <p className="mx-4 md:my-1">{genre}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-2">Учасники:</p>
              <div className="flex flex-wrap">
                {event.participants.map((participant) => {
                  return (
                    <div className="bg-gray-400 mr-4 mb-2 rounded">
                      <p className="mx-4 md:my-1">{participant}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <p>Дата проведення: {event.date}</p>
            <p>Адреса: {event.adress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
