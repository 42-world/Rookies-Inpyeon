import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button, Text } from "@rookies-team/design";

import { SecondaryHeader, WriteForm } from "@/components";
import { httpClient } from "@/services";

interface Props {
  soldierNickname: string;
  displayId: string;
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes)
    return { props: { soldierNickname: null, displayId, id: null } };

  const linkRes = await httpClient({
    path: `/link?soldierId=${soldierRes.id}&displayId=${displayId}`,
  });
  if (!linkRes) return { props: { soldierNickname, displayId, id: null } };

  return {
    props: { soldierNickname, displayId, id: linkRes.id ?? null },
  };
};

export default function Write({ soldierNickname, displayId, id }: Props) {
  if (!soldierNickname || !id) return <h1>존재하지 않는 군인 또는 id입니다</h1>;

  return (
    <>
      <SecondaryHeader
        link={`/${soldierNickname}/${displayId}`}
        buttonText="←"
        headerText={soldierNickname}
      />
      <WriteForm linkId={id} />
    </>
  );
}
