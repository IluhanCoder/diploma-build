import { logRoles } from "@testing-library/react";
import React, { useState } from "react";
import { IParticipant } from "../../../models/IEvent";

type LocalParams = {
  participant: IParticipant;
  participants: IParticipant[];
  setParticipants: React.Dispatch<React.SetStateAction<any>>;
  roles: string[];
  setRoles: React.Dispatch<React.SetStateAction<any>>;
};

const RoleInput = ({
  participant,
  setParticipants,
  participants,
  roles,
  setRoles,
}: LocalParams) => {
  const ChangeRoleHandler = (
    oldRole: string,
    newRole: string,
    participantId: string
  ) => {
    let result: IParticipant[] = [];
    let newRoles: string[] = [];
    participants?.map((participant: IParticipant) => {
      let newParticipant = participant;
      if (participant._id == participantId) newParticipant.role = newRole;
      result.push(newParticipant);
    });
    newRoles = roles.filter((role: string) => {
      return role != newRole && role != "без ролі";
    });
    if (oldRole != "без ролі") newRoles.push(oldRole);
    setParticipants(result);
    setRoles(newRoles);
  };

  return (
    <select
      onChange={(e) => {
        ChangeRoleHandler(participant.role, e.target.value, participant._id);
      }}
      value={participant.role}
    >
      {participant.role != "без ролі" && (
        <option value={participant.role}>{participant.role}</option>
      )}
      {roles.map((role: string) => {
        return <option value={role}>{role}</option>;
      })}
      <option value="без ролі">без ролі</option>
    </select>
  );
};

export default RoleInput;
