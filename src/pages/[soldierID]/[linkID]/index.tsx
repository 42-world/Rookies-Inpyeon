import Link from "next/link";
import { GetServerSideProps } from "next";

import { Letter } from "@/types/Letter";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { linkID } = context.query;
  const res = await fetch(`http://localhost:8888/letter?linkId=${linkID}`);
  const letters = await res.json();
  return {
    props: { letters },
  };
};

export default function Letters({ letters }: { letters: Letter[] }) {
  const {
    query: { soldierID, linkID },
  } = useRouter();
  console.log(letters);
  return (
    <main>
      <h1>편지 목록</h1>
      {letters.map((letter, index) => (
        <Link
          key={`${linkID}-${letter.id}`}
          href={`/${soldierID}/${letter.linkId}/${letter.id}`}>
          <h3>{letter.title}</h3>
        </Link>
      ))}
    </main>
  );
}
