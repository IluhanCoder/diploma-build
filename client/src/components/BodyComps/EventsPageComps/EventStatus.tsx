import { observer } from "mobx-react-lite";

type LocalParams = {
  isSubmited: boolean;
  className: string | undefined;
};

const EventStatus = (params: LocalParams) => {
  const { isSubmited, className } = params;
  return isSubmited ? (
    <div
      className={
        className + " bg-green-300 text-green-700 border-4 border-green-200"
      }
    >
      Подію підтверджено
    </div>
  ) : (
    <div
      className={className + " bg-red-400 text-red-700 border-4 border-red-500"}
    >
      Подію не підтверджено
    </div>
  );
};

export default observer(EventStatus);
