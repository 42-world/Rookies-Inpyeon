import { Inter } from "next/font/google";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Link href="/auth/login">로그인 하러가기</Link>
      <Link href="/eunsoo/jvq/write">글쓰기</Link>
      <Link href="/eunsoo/jvq">편지 목록</Link>
    </main>
  );
}
