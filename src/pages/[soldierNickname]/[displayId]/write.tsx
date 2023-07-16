import { WriteForm } from "@/components";
import { GetServerSideProps } from "next";

interface Props {
  soldierNickname: string;
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await fetch(
    `http://localhost:8888/soldier?nickname=${soldierNickname}`
  ).then((res) => res.json());
  const linkRes = await fetch(
    `http://localhost:8888/link?soldierId=${soldierRes.id}&displayId=${displayId}`
  ).then((res) => res.json());
  return {
    props: { soldierNickname, id: linkRes.id },
  };
};

export default function Write({ soldierNickname, id }: Props) {
  return (
    <>
      <h1>{soldierNickname}</h1>
      <WriteForm linkId={id} />
    </>
  );
}
