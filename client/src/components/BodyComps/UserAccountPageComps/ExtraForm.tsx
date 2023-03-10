type LocalParams = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  editMode: boolean;
  className?: string;
};

const ExtraInput = (params: LocalParams) => {
  const { value, setValue, editMode, className } = params;
  if (editMode) {
    return (
      <input
        className={
          "p-1 block bg-white border border-slate-300 rounded-md h-full shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm " +
          className
        }
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  } else {
    return <p>{value}</p>;
  }
};

export default ExtraInput;
