import { BiPencil } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

type LocalParams = {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  size: number;
};

const EditButton = (params: LocalParams) => {
  const { value, setValue, size } = params;

  const handleButtonClick = () => {
    setValue(!value);
    if (value) window.location.reload();
  };

  return (
    <button
      type="button"
      title={value ? "Завершити редагування" : "Редагувати сторінку"}
      className="hover:bg-gray-100"
      onClick={handleButtonClick}
    >
      {value ? (
        <GiCancel size={size} color="rgb(255, 100, 10)" />
      ) : (
        <BiPencil size={size} />
      )}
    </button>
  );
};

export default EditButton;
