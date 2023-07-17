import { Soldier } from "@/types/Soldier";
import { AvatarText } from "@rookies-team/design";
import Image from "next/image";

interface Props {
  soldier: Soldier;
}

export const SoldierInfo = ({ soldier }: Props) => {
  return (
    <div className="p-4 bg-[#F4F5F6] rounded-2xl my-3 shadow-sm">
      <AvatarText
        src="https://picsum.photos/200/300"
        mainText={soldier.name}
        subText={soldier.campId}
        alt="soldier profile picture"
        size="64px"
      />
    </div>
  );
};
