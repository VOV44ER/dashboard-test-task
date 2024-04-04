import { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Dashboard Test Task</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
