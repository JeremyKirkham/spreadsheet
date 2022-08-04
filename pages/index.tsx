import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { TopMenu } from "../components/menu/TopMenu";
import { Sheet } from "../components/Sheet";
import { ThemeContext } from "../contexts/ThemeContext";

const Home: NextPage = () => {
  const { lightColor } = useContext(ThemeContext);

  return (
    <div className="sheet-cont">
      <Head>
        <title>Spreadsheet</title>
      </Head>
      <TopMenu />
      <Sheet />
      <style jsx>{`
        .sheet-cont {
          background: ${lightColor};
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Home;
