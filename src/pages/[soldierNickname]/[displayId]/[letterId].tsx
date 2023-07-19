import { GetServerSideProps } from "next";
import { getDateDistance, getDateDistanceText } from "@toss/date";

import { SecondaryHeader } from "@/components";
import { Letter } from "@/types/Letter";
import { Text } from "@rookies-team/design";

interface Props {
  soldierNickname: string;
  displayId: string;
  letter: Letter;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId, letterId } = context.query;
  const res = await fetch(`http://localhost:8889/letter/${letterId}`);
  const letter = await res.json();
  return {
    props: { soldierNickname, displayId, letter },
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
