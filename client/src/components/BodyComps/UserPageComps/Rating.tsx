import { useEffect, useState } from "react";
import FeedbackService from "../../../services/FeedbackService";
import PointsPicker from "../FeedBackPageComps/PointsPicker";

type LocalParams = {
  userId: string;
};

const Rating = ({ userId }: LocalParams) => {
  const [rating, setRating] = useState<number>();

  const getData = () => {
    FeedbackService.getRating(userId).then((res) =>
      setRating(res.data[0].average)
    );
  };
  useEffect(() => {
    if (userId) getData();
  }, [userId]);

  if (rating) return <PointsPicker points={rating} disabled />;
  else return <div>у користувача нема відгуків</div>;
};

export default Rating;
