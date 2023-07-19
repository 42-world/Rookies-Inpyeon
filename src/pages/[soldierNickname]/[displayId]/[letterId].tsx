import { GetServerSideProps } from "next";
import { getDateDistance, getDateDistanceText } from "@toss/date";
import { Text } from "@rookies-team/design";

import { SecondaryHeader } from "@/components";
import { Letter } from "@/types/Letter";
import { httpClient } from "@/services";

interface Props {
  soldierNickname: string;
  displayId: string;
  letter: Letter;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId, letterId } = context.query;
  const letterRes = await httpClient({ path: `/letter/${letterId}` });
  return {
    props: { soldierNickname, displayId, letter: letterRes },
  };
};

export default function Letter({ soldierNickname, displayId, letter }: Props) {
  const distance = getDateDistance(new Date(letter.createdAt), new Date());
  const distanceDate =
    distance.days > 1
      ? `${distance.days}일 전`
      : `${distance.days * 24 + distance.hours}시간 전`;

  return (
    <>
      <SecondaryHeader
        link={`/${soldierNickname}/${displayId}`}
        buttonText="←"
      />
      <div className="py-2">
        <Text
          size="body1"
          weight="medium"
          color="secondary"
          text={distanceDate}
        />
        <Text size="heading2" weight="semibold" text={letter.title} />
      </div>
      <Text
        size="body1"
        weight="regular"
        color="secondary"
        text={letter.content}
        className="py-4"
      />
    </>
  );
}
