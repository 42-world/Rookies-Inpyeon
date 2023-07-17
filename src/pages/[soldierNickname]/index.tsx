import { GetServerSideProps } from "next";
import Link from "next/link";

import { httpClient } from "@/services";
import { Link as ResponseLink } from "@/types/Link";
import { SoldierInfo, TextWithButton } from "@/components";
import { Soldier } from "@/types/Soldier";
import { Button, ListItem, Text } from "@rookies-team/design";

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
  const handleClick = (displayId: string) => {
    return () => {
      navigator.clipboard
        .writeText(
          `http://localhost:3000/${soldier.nickname}/${displayId}/write`
        )
        .then(() => alert("링크가 복사되었어요!"));
    };
  };

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
        <>
          {links.map((link) => (
            <div
              key={`link-${link.id}`}
              className="flex flex-row justify-between items-center">
              <Link
                href={`/${soldierNickname}/${link.displayId}`}
                className="mr-4 flex-1">
                <ListItem
                  title={link.description}
                  secondaryTextFirst={link.displayId}
                />
              </Link>
              <Button
                type="button"
                text="복사하기"
                onClick={handleClick(link.displayId)}
              />
            </div>
          ))}
          <Link href={`/${soldierNickname}/create-link`} className="mt-4">
            <Button type="button" text="링크 추가하기" />
          </Link>
        </>
      )}
    </>
  );
}
