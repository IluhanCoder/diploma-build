import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFeedback } from "../../../models/IFeedback";
import FeedbackService from "../../../services/FeedbackService";
import PointsPicker from "../FeedBackPageComps/PointsPicker";

type LocalParams = {
  userId: string;
};

const UserFeedBacks = ({ userId }: LocalParams) => {
  const [feedBacks, setFeedBacks] = useState<IFeedback[]>();

  const getData = () => {
    FeedbackService.getUserFeedbacks(userId).then((res) =>
      setFeedBacks(res.data)
    );
  };
  useEffect(() => {
    if (userId) getData();
  }, [userId]);

  if (feedBacks)
    return (
      <div className="flex flex-col bg-white rounded drop-shadow p-6 gap-4 w-2/4">
        <div className="text-center text-xl">Відгуки:</div>
        <div className="flex flex-col gap-2">
          {feedBacks.map((feedback: IFeedback) => {
            return (
              <div
                key={feedback._id}
                className="flex flex-col py-4 px-8 bg-gray-100 roounded drop-shadow"
              >
                <div className="flex w-full justify-between">
                  <div>
                    <Link to={`/user/${feedback.sender._id}`}>
                      {feedback.sender.login}
                    </Link>
                  </div>
                  <div>
                    <PointsPicker points={feedback.value} disabled />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div>{feedback.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  else return <></>;
};

export default UserFeedBacks;
