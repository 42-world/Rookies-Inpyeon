import { Text } from "@rookies-team/design";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center">
      <header className="w-full max-w-[800px] py-4 px-5 flex flex-row justify-start items-center">
        <Link href="/">
          <Text text="ROOK!ES | 인편지기" size="heading2" />
        </Link>
      </header>
      <main className="w-full flex flex-col flex-1 max-w-[800px] px-5">
        {children}
      </main>
    </div>
  );
};
