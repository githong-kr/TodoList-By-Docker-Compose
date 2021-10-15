import { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadSpinner from '../components/Loading';
import GlobalStyle from '../styles/GlobalStyle';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { wrapper } from '../store';

const app = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('findished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      {loading ? <LoadSpinner /> : <Component {...pageProps} />}
      <Footer />
    </>
  );
};

export default wrapper.withRedux(app);
