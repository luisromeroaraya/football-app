import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PositionRow: FC<Props> = ({ children }) => (
  <div  className="flex h-[8.333333333333333%] w-full items-center justify-center">
    {children}
  </div>
);

export default PositionRow;
