import Link from "next/link";
import { GetServerSideProps } from "next";

import { Letter } from "@/types/Letter";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await fetch(
    `http://localhost:8888/soldier?nickname=${soldierNickname}`
  ).then((res) => res.json());
  if (!soldierRes) return { props: { letters: [] } };

  const linkRes = await fetch(
    `http://localhost:8888/link?soldierId=${soldierRes.id}&displayId=${displayId}`
  ).then((res) => res.json());
  if (!soldierRes) return { props: { letters: [] } };

  const letterRes = await fetch(
    `http://localhost:8888/letter/by/linkId/${linkRes.id}`
  ).then((res) => res.json());

  console.log(letterRes);
  // TODO: 여기서 오류 발생
  return {
    props: { letter: letterRes.letters ?? [] },
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
