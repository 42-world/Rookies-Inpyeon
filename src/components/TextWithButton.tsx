import { Button, Text } from "@rookies-team/design";
import Link from "next/link";

interface Props {
  text: string;
  buttonText: string;
  link?: string;
  onClick?: () => void;
}

export const TextWithButton = ({ text, buttonText, link, onClick }: Props) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Text
        color="secondary"
        size="body1"
        weight="regular"
        align="center"
        className="whitespace-pre-wrap mb-4"
        text={text}
      />
      {link ? (
        <Link href={link}>
          <Button type="button" text={buttonText} />
        </Link>
      ) : (
        <Button onClick={onClick} text={buttonText} />
      )}
    </div>
  );
};
