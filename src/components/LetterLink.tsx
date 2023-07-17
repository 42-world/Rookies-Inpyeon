import { Letter } from "@/types/Letter";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  letter: Letter;
}

export const LetterLink = ({ letter }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();
  return (
    <div>
      <button onClick={() => setIsActive((prev) => !prev)}>
        <h3>{letter.writer}이(가) 쓴 편지입니다</h3>
        <p>{letter.createdAt}</p>
      </button>
      {isActive && (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <input
            className="border"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
          />
          <button disabled={!watch("password")}>이동</button>
        </form>
      )}
    </div>
  );
};
