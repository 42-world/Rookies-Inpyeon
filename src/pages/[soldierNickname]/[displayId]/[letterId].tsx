import { GetServerSideProps } from "next";

import { LetterViewForm, SecondaryHeader } from "@/components";
interface Props {
  soldierNickname: string;
  displayId: string;
  letterId: number;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId, letterId, password } = context.query;
  if (!password)
    return { props: { soldierNickname, displayId, letterId, password: null } };
  return {
    props: { soldierNickname, displayId, letterId, password },
  };
};

export default function Letter({
  soldierNickname,
  displayId,
  letterId,
  password,
}: Props) {
  return (
    <>
      <SecondaryHeader
        link={`/${soldierNickname}/${displayId}`}
        buttonText="←"
      />
      <LetterViewForm letterId={letterId} password={password} />
    </>
  );
}
