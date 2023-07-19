import { httpClient } from "@/services";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoCallback() {
  const {
    push,
    query: { code },
  } = useRouter();

  useEffect(() => {
    if (code) {
      httpClient({ path: `/auth/kakao/callback?code=${code}` }).then((res) => {
        console.log(res);
        push("/"); // 로그인 성공 시 메인 페이지로 이동
      });
    }
  }, [code, push]);
  return <div>카카오 로그인 콜백 페이지</div>;
}
