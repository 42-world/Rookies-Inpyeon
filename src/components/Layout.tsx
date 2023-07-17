import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center">
      <div className="w-full max-w-[800px] py-4 px-5 flex flex-row justify-start items-center">
        <h1>ROOK!ES | 인편지기</h1>
      </div>
      <div className="w-full max-w-[800px] px-5">{children}</div>
    </div>
  );
};
