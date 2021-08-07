import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Mall.module.css";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../page-components/mall"),
  { ssr: false }
);

function ClientOnly() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PixMall</title>
        <meta name="description" content="Another brick in the Mall" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicComponentWithNoSSR />
    </div>
  );
}

export default ClientOnly;
