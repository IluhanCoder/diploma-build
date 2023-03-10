import { useContext, useState } from "react";
import { Context } from "../../..";
import { IParticipant } from "../../../models/IEvent";
import { IFeedback } from "../../../models/IFeedback";
import FeedbackService from "../../../services/FeedbackService";
import PointsPicker from "./PointsPicker";

type LocalParams = {
  participant: IParticipant;
};

const FeedBack = ({ participant }: LocalParams) => {
  const { store } = useContext(Context);

  const [points, setPoints] = useState<number>(0);
  const [feedback, setFeedBack] = useState<IFeedback>();
  const [content, setContent] = useState<string>("");

  const sendHandler = () => {
    FeedbackService.getFeedback(store.user._id, participant._id).then((res) =>
      setFeedBack(res.data)
    );
    if (!feedback?.content) {
      FeedbackService.newFeedback(
        store.user._id,
        participant._id,
        content,
        points
      );
      alert("відгук успішно надіслано");
    } else alert("ви вже надіслали відгук цьому користувачу");
  };

  return (
    <div
      className="bg-white rounded drop-shadow flex flex-col p-4 gap-4"
      key={participant._id}
    >
      <div className="text-center font-bold text-xl">
        {participant.name} - {participant.role}
      </div>
      <div className="flex justify-center px-10 flex flex-col gap-2">
        <label>Відгук:</label>
        <textarea
          className="border-2 border-gray-300 rounded w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <label>Оцінка: </label>
          <div>{points}/5</div>
        </div>
        <div className="flex justify-center">
          <PointsPicker points={points} setPoints={setPoints} />
        </div>
      </div>
      <div className="flex justify justify-center">
        <button
          className="bg-green-400 rounded px-2 py-1 drop-shadow hover:bg-green-200"
          onClick={() => sendHandler()}
        >
          надіслати відгук
        </button>
      </div>
    </div>
  );
};

export default FeedBack;
