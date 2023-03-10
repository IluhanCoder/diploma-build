import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IParticipant } from "../../models/IEvent";
import EventService from "../../services/EventService";
import FeedBack from "./FeedBackPageComps/ParticipantFeedback";

const FeedBackPage = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState<IParticipant[]>();

  const getData = () => {
    EventService.getParticipants(eventId!).then((res) =>
      setParticipants(res.data)
    );
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="text-center text-2xl p-4">
        залиште відгук учасникам події:
      </div>
      <div className="grid grid-cols-2 gap-2">
        {participants?.map((participant: IParticipant) => {
          return <FeedBack participant={participant} />;
        })}
      </div>
    </div>
  );
};

export default FeedBackPage;
