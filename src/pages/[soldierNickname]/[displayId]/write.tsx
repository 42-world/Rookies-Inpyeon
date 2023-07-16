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
  if (!soldierRes) return { props: { soldierNickname: null, id: null } };

  const linkRes = await fetch(
    `http://localhost:8888/link?soldierId=${soldierRes.id}&displayId=${displayId}`
  ).then((res) => res.json());
  if (!linkRes) return { props: { soldierNickname, id: null } };

  return {
    props: { soldierNickname, id: linkRes.id ?? null },
  };
};

export default function Write({ soldierNickname, id }: Props) {
  if (!soldierNickname || !id) return <h1>존재하지 않는 군인 또는 id입니다</h1>;
  return (
    <>
      <h1>{soldierNickname}</h1>
      <WriteForm linkId={id} />
    </>
  );
}
