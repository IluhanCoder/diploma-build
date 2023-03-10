import React from "react";

type LocalProps = {
  itemClassName?: string;
  array: string[];
  className?: string;
};

const ArrayMapper = (props: LocalProps) => {
  const { array, itemClassName, className } = props;
  if (array) {
    return (
      <div className={className}>
        {array.map((item: string) => {
          return (
            <div key={array.indexOf(item)} className={itemClassName}>
              {item}
            </div>
          );
        })}
      </div>
    );
  } else return <></>;
};

export default ArrayMapper;
