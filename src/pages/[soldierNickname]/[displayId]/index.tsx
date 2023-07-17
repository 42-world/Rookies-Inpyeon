import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ListItem } from "@rookies-team/design";

import { Letter } from "@/types/Letter";
import { Soldier } from "@/types/Soldier";
import { httpClient } from "@/services";
import { SoldierInfo } from "@/components";

interface Props {
  soldier: Soldier;
  letters: Letter[] | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("cookie: ", context.req.headers.cookie);
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { letters: null } };

  const linkRes = await httpClient({
    path: `/link?soldierId=${soldierRes.id}&displayId=${displayId}`,
    headers: {
      Cookie: context.req.headers.cookie,
    },
  });
  if (!linkRes) return { props: { letters: null } };

  const letterRes = await httpClient({
    path: `/letter/by/linkId/${linkRes.id}`,
  });
  return {
    props: { soldier: soldierRes, letters: letterRes ?? null },
  };
};

export default function Letters({ soldier, letters }: Props) {
  const {
    query: { soldierNickname, displayId },
  } = useRouter();

  console.log(letters);
  if (!letters) return <h1>군인 혹은 링크가 잘못되었습니다</h1>;
  return (
    <main>
      <SoldierInfo soldier={soldier} />
      <ul className="flex flex-col">
        {letters &&
          letters.map((letter) => (
            <ListItem
              key={`${displayId}-${letter.id}`}
              secondaryTextFirst={letter.createdAt}
              // secondaryTextSecond={}
              title={`${letter.writer}님이 보낸 인편입니다!`}
            />
            // <li key={`${displayId}-${letter.id}`}>
            //   <LetterLink letter={letter} />
            // </li>
          ))}
      </ul>
    </main>
  );
}
