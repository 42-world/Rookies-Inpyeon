import { GetServerSideProps } from "next";

import { WriteForm } from "@/components";
import { httpClient } from "@/services";
import { Text } from "@rookies-team/design";

interface Props {
  soldierNickname: string;
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { soldierNickname: null, id: null } };

  const linkRes = await httpClient({
    path: `/link?soldierId=${soldierRes.id}&displayId=${displayId}`,
  });
  if (!linkRes) return { props: { soldierNickname, id: null } };

  return {
    props: { soldierNickname, id: linkRes.id ?? null },
  };
};

export default function Write({ soldierNickname, id }: Props) {
  if (!soldierNickname || !id) return <h1>존재하지 않는 군인 또는 id입니다</h1>;
  return (
    <>
      <Text size="heading2" text={soldierNickname} />
      <WriteForm linkId={id} />
    </>
  );
}
