import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import { Letter } from "@/types/Letter";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const soldiers: string[] = await fetch("http://localhost:8888/soldier").then(
    (res) => res.json()
  );
  const link = soldiers.map(async (soldier) => {
    return await fetch(`http://localhost:8888/link?soldierId=${soldier}`).then(
      (res) => res.json()
    );
  });

  console.log(link);
  return {
    paths: {},
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { linkDisplayId } = params;
  const res = await fetch(
    `http://localhost:8888/letter?linkDisplayId=${linkDisplayId}`
  );
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
