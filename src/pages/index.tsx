import { Inter } from "next/font/google";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}>
      <h3>차영훈님에게 편지를 작성해주세요</h3>
      <Link href="/auth/login">로그인 하러가기</Link>
      <Link href="/eunsoo/gud/write">글쓰기</Link>
      <Link href="/eunsoo/gud">편지 목록</Link>
      <Link href="/eunsoo/links">링크 목록</Link>
      <Link href="/soldiers">군인 목록</Link>
    </main>
  );
}
