import { Link } from "react-router-dom";

type LocalParams = {
  message: string;
  link: string;
  linkText: string;
};

const Message = ({ message, link, linkText }: LocalParams) => {
  return (
    <div className="flex flex-col gap-10 justify-center p-10">
      <div className="text-3xl">{message}</div>
      <div>
        <Link to={link}>{linkText}</Link>
      </div>
    </div>
  );
};

export default Message;
