import { GetServerSideProps } from "next";

import { LinkAddForm, SoldierInfo } from "@/components";
import { httpClient } from "@/services";
import { Soldier } from "@/types/Soldier";

interface Props {
  soldierNickname: string;
  soldier: Soldier;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { soldierNickname, soldierId: null } };

  return {
    props: { soldierNickname, soldier: soldierRes },
  };
};

export default function CreateLink({ soldierNickname, soldier }: Props) {
  return (
    <>
      <SoldierInfo soldier={soldier} />
      <LinkAddForm soldierNickname={soldierNickname} soldierId={soldier.id} />
    </>
  );
}
