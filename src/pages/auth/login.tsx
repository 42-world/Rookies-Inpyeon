export default function Login() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <a
        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao`}
        className="bg-yellow-300 px-5 py-2"
      >
        카카오 로그인
      </a>
    </main>
  );
}
