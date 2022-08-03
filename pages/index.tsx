import type { NextPage } from "next";
import Head from "next/head";
import { Sheet } from "../components/Sheet";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spreadsheet</title>
      </Head>
      <Sheet />
      <style jsx>{``}</style>
    </>
  );
};

export default Home;
