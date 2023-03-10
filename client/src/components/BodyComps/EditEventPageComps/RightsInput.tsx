import React, { useState } from "react";
import { IParticipant } from "../../../models/IEvent";
import rightsArray from "../../../static/rights-array";

type LocalParams = {
  participant: IParticipant;
  participants: IParticipant[];
  setParticipants: React.Dispatch<React.SetStateAction<any>>;
};

const RightsInput = ({
  participant,
  setParticipants,
  participants,
}: LocalParams) => {
  const ChangeRightsHandler = (newRights: number, participantId: string) => {
    let result: IParticipant[] = [];
    participants?.map((participant: IParticipant) => {
      let newParticipant = participant;
      if (participant._id == participantId) newParticipant.rights = newRights;
      result.push(newParticipant);
    });
    setParticipants(result);
  };

  return (
    <select
      value={participant.rights}
      onChange={(e) => {
        ChangeRightsHandler(+e.target.value, participant._id);
      }}
    >
      {rightsArray.map((right: string) => {
        return <option value={rightsArray.indexOf(right)}>{right}</option>;
      })}
    </select>
  );
};

export default RightsInput;
