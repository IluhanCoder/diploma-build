import { Link } from "react-router-dom";

type LocalParams = {
  userId: string;
};

const UserMoreButtons = (params: LocalParams) => {
  const { userId } = params;

  return (
    <div className="flex flex-row gap-5">
      <Link to={"/user/" + userId}>
        <button type="button">Детальніше</button>
      </Link>
    </div>
  );
};

export default UserMoreButtons;
