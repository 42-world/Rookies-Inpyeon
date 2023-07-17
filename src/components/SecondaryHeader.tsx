import Link from "next/link";
import { Button, Text } from "@rookies-team/design";

interface Props {
  link: string;
  buttonText: string;
  headerText?: string;
}

export const SecondaryHeader = ({ link, buttonText, headerText }: Props) => {
  return (
    <div className="flex flex-row items-center">
      <Link href={link}>
        <Button type="button" variant="text" text={buttonText} />
      </Link>
      {headerText && <Text size="heading2" text={headerText} />}
    </div>
  );
};
