type LocalParams = {
  gender: string;
  className?: string;
};

const GenderDisplayer = ({ gender, className }: LocalParams) => {
  let value = "";
  switch (gender) {
    case "male":
      value = "чоловіча";
      break;
    case "female":
      value = "жіноча";
      break;
    case "none":
      value = "не вказана";
      break;
  }
  return <div className={className}>{value}</div>;
};

export default GenderDisplayer;
