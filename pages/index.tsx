import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { Provider } from "react-redux";
import { TopMenu } from "../components/menu/TopMenu";
import { Sheet } from "../components/Sheet";
import { ThemeContext } from "../contexts/ThemeContext";
import { store } from "../store";

const Home: NextPage = () => {
  const { lightColor } = useContext(ThemeContext);

  return (
    <div className="sheet-cont">
      <Head>
        <title>Spreadsheet</title>
      </Head>
      <TopMenu />
      <Provider store={store}>
        <Sheet />
      </Provider>
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
