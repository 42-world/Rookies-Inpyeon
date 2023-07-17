import { GetServerSideProps } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import { httpClient } from "@/services";
import { Soldier } from "@/types/Soldier";
import { SoldierInfo } from "@/components";
import { Button, Text } from "@rookies-team/design";

const inter = Inter({ subsets: ["latin"] });
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

export default function Home({ soldiers }: Props) {
  return (
    <main>
      {soldiers ? (
        <>
          <h1>내 군인 목록</h1> {/* TODO: 디자인에 없는 부분임 */}
          {soldiers.map((soldier) => (
            <Link key={`soldier-${soldier.id}`} href={`/${soldier.nickname}`}>
              <SoldierInfo soldier={soldier} />
            </Link>
          ))}
        </>
      ) : (
        <div>
          <Text text="로그인이 되어 있지 않아요." />
          <Link href="/auth/login">
            <Button variant="primary" type="button" text="로그인 하러가기" />
          </Link>
        </div>
      )}
      {soldiers && soldiers.length === 0 && (
        <div>
          {/* TODO: 임시 (여기 아직 테스트 못해봄) */}
          <Text text="등록된 군인이 없어요." />
          <Button type="button" text="군인 등록하기" />
        </div>
      )}
      {/* <Link href="/auth/login">로그인 하러가기</Link> */}
      {/* <Link href="/eunsoo/gud/write">글쓰기</Link> */}
      {/* <Link href="/eunsoo/gud">편지 목록</Link> */}
      {/* <Link href="/eunsoo">링크 목록</Link> */}
      {/* <Link href="/soldiers">군인 목록</Link> */}
    </main>
  );
}
