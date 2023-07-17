import { SoldierAddForm } from "@/components";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      cookie: context.req.headers.cookie,
    },
  };
};

interface Props {
  cookie: string;
}

export default function New({ cookie }: Props) {
  return (
    <>
      <SoldierAddForm cookie={cookie} />
    </>
  );
}
