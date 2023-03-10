import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type LocalParams = {
  points: number;
  disabled?: boolean;
  setPoints?: React.Dispatch<any>;
};

const PointsPicker = ({ points, setPoints, disabled }: LocalParams) => {
  const clickHandler = (value: number) => {
    setPoints!(value);
  };

  return (
    <div className="flex">
      <button disabled={disabled} type="button" onClick={() => clickHandler(1)}>
        {points >= 1 ? <AiFillStar /> : <AiOutlineStar />}
      </button>
      <button disabled={disabled} type="button" onClick={() => clickHandler(2)}>
        {points >= 2 ? <AiFillStar /> : <AiOutlineStar />}
      </button>
      <button disabled={disabled} type="button" onClick={() => clickHandler(3)}>
        {points >= 3 ? <AiFillStar /> : <AiOutlineStar />}
      </button>
      <button disabled={disabled} type="button" onClick={() => clickHandler(4)}>
        {points >= 4 ? <AiFillStar /> : <AiOutlineStar />}
      </button>
      <button disabled={disabled} type="button" onClick={() => clickHandler(5)}>
        {points >= 5 ? <AiFillStar /> : <AiOutlineStar />}
      </button>
    </div>
  );
};

export default PointsPicker;
