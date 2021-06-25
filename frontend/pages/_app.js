import '../styles/globals.scss';
import Layout from '../components/Layout';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>My Site</title>
        <meta name="description" content="Personal Website" />
        {/* <link rel="shortcut icon" href="/favicon.jpg" /> */}
      </Head>
      <ReactNotification />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
