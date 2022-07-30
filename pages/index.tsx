import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Sheet } from "../components/Sheet";
import { TopMenu } from "../components/TopMenu";

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
