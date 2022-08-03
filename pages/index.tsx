import type { NextPage } from "next";
import Head from "next/head";
import { TopMenu } from "../components/menu/TopMenu";
import { Sheet } from "../components/Sheet";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spreadsheet</title>
      </Head>
      <TopMenu />
      <Sheet />
      <style jsx>{``}</style>
    </>
  );
};

export default Home;
