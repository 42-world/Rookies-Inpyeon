import { GetServerSideProps } from "next";

import { httpClient } from "@/services";
import { Link as ResponseLink } from "@/types/Link";
import Link from "next/link";

interface Props {
  soldierNickname: string;
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
  if (!linkRes) return { props: { soldierNickname, links: null } };

  return {
    props: { soldierNickname, links: linkRes ?? null },
  };
};

export default function Links({ soldierNickname, links }: Props) {
  if (!links) return <h1>존재하지 않는 군인입니다</h1>;
  return (
    <main>
      <h1>{soldierNickname} 링크 목록</h1>
      <ul className="flex flex-col">
        {links.map((link) => (
          <Link
            key={`link-${link.id}`}
            href={`/${soldierNickname}/${link.displayId}`}>
            {link.displayId}
          </Link>
        ))}
      </ul>
    </main>
  );
}
