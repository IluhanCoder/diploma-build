import React from "react";
import UserService from "../../../services/UserService";

type LocalParams = {
  display: boolean;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
  accept?: string;
};

export default function FileUploader({
  display,
  setFile,
  className,
  accept,
}: LocalParams): JSX.Element {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    setFile(file);
  };

  if (display) {
    return (
      <div className="flex justify-center">
        <button
          className="bg-gray-200 rounded p-1 drop-shadow hover:bg-gray-100"
          onClick={() => document.getElementById("getFile")!.click()}
        >
          Завантажити файл
        </button>
        <input
          className="hidden"
          onChange={(e) => handleFileSelected(e)}
          type="file"
          name="file"
          accept={accept}
          id="getFile"
        />
      </div>
    );
  } else {
    return <></>;
  }
}
