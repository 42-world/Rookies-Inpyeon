import { GetServerSideProps } from "next";
import Link from "next/link";

import { httpClient } from "@/services";
import { Soldier } from "@/types/Soldier";

interface Props {
  soldiers: Soldier[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const soldierRes = await httpClient({
    path: `/soldier/all`,
    headers: {
      Cookie: context.req.headers.cookie,
    },
  });
  if (!soldierRes) return { props: { soldiers: null } };

  console.log(soldierRes);
  return {
    props: { soldiers: soldierRes },
  };
};

export default function Soldiers({ soldiers }: Props) {
  if (!soldiers) return <h1>로그인 정보가 손상되었습니다</h1>;
  return (
    <div>
      <h1>내 군인</h1>
      {soldiers.map((soldier) => (
        <Link key={`soldier-${soldier.id}`} href={`/${soldier.nickname}`}>
          {soldier.nickname}
        </Link>
      ))}
    </div>
  );
}
