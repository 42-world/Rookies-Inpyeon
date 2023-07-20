import { useRouter } from "next/router";
import { getDateDistance } from "@toss/date";
import { ListItem } from "@rookies-team/design";

import { LetterShort } from "@/types/Letter";
import Link from "next/link";

interface Props {
  letter: LetterShort;
  soldierNickname: string;
  displayId: string;
}

export const LetterLink = ({ letter, soldierNickname, displayId }: Props) => {
  const router = useRouter();

  const distance = getDateDistance(new Date(letter.createdAt), new Date());
  const distanceDate =
    distance.days > 1
      ? `${distance.days}일 전`
      : `${distance.days * 24 + distance.hours}시간 전`;

  return (
    <Link
      href={`/${soldierNickname}/${displayId}/${letter.id}?password=${letter.hasPassword}`}>
      <ListItem
        secondaryTextFirst={distanceDate}
        title={`${letter.writer}님이 보낸 인편입니다!`}
      />
    </Link>
  );
};
