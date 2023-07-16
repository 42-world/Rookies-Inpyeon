import Link from "next/link";
import { GetServerSideProps } from "next";

import { Letter } from "@/types/Letter";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { letterID } = context.query;
  const res = await fetch(`http://localhost:8888/letter/${letterID}`);
  const letter = await res.json();
  return {
    props: { letter },
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
