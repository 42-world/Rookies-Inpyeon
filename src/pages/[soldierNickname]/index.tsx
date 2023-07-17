import { GetServerSideProps } from "next";
import Link from "next/link";

import { httpClient } from "@/services";
import { Link as ResponseLink } from "@/types/Link";
import { SoldierInfo, TextWithButton } from "@/components";
import { Soldier } from "@/types/Soldier";
import { Button, Text } from "@rookies-team/design";

interface Props {
  soldierNickname: string;
  soldier: Soldier;
  links: ResponseLink[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { links: null } };

  const linkRes = await httpClient({
    path: `/link/by/soldierId/${soldierRes.id}`,
    headers: {
      Cookie: context.req.headers.cookie,
    },
  });
  if (!linkRes)
    return { props: { soldierNickname, soldier: soldierRes, links: null } };

  return {
    props: { soldierNickname, soldier: soldierRes, links: linkRes ?? null },
  };
};

export default function Links({ soldierNickname, soldier, links }: Props) {
  // const handleClick = () => {
  //   navigator.clipboard.writeText(
  //     `https://localhost:3000/${soldier.nickname}` // TODO: 링크 수정
  //   );
  // };

  if (!links) return <h1>존재하지 않는 군인입니다</h1>;
  return (
    <>
      <SoldierInfo soldier={soldier} />
      {links.length === 0 ? (
        <TextWithButton
          link={`/${soldierNickname}/create-link`}
          text={`아직 ${soldierNickname} 님의 인편 링크가 없어요.\n링크를 생성해 보세요.`}
          buttonText="링크 생성하기"
        />
      ) : (
        // <TextWithButton
        //   onClick={handleClick}
        //   text={`아직 ${soldierNickname} 님에게 작성된 편지가 없어요.\n지금 바로 주변 사람들에게 링크를 전송해 보세요.`}
        //   buttonText="내 우편함 링크 복사하기"
        // />
        links.map((link) => (
          <Link
            key={`link-${link.id}`}
            href={`/${soldierNickname}/${link.displayId}`}>
            {link.displayId}
          </Link>
        ))
      )}
    </>
  );
}
