import { Letter } from "@/types/Letter";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { letterId } = context.query;
  const res = await fetch(`http://localhost:8889/letter/${letterId}`);
  const letter = await res.json();
  return {
    props: { letter },
  };
};

export default function Letter({ letter }: { letter: Letter }) {
  return (
    <div>
      <h2>{letter.title}</h2>
      <p>{letter.content}</p>
    </div>
  );
}
