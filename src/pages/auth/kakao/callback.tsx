import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoCallback() {
  const {
    push,
    query: { code },
  } = useRouter();

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:8889/auth/kakao/callback?code=${code}`, {
        method: "GET",
        credentials: "include",
      }).then((res) => {
        push("/"); // 로그인 성공 시 메인 페이지로 이동
      });
    }
  }, [code, push]);
  return <div>카카오 로그인 콜백 페이지</div>;
}
