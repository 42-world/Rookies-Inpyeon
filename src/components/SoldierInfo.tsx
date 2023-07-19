import { Soldier } from "@/types/Soldier";
import { AvatarText } from "@rookies-team/design";
import Image from "next/image";

interface Props {
  soldier: Soldier;
}

export const SoldierInfo = ({ soldier }: Props) => {
  return (
    <div className="p-4 bg-bg-secondary dark:bg-bg-secondary_dark rounded-2xl my-3 shadow-sm">
      <AvatarText
        src="https://picsum.photos/200/300"
        mainText={soldier.name}
        subText={soldier.troopName + " ∙ " + soldier.soldierType}
        alt="soldier profile picture"
        size="64px"
      />
    </div>
  );
};
