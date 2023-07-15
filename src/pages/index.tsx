import { Inter } from "next/font/google";

import Link from "next/link";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    fetch(`http://localhost:8888/users`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href="/auth/login">로그인 하러가기</Link>
    </main>
  );
}
