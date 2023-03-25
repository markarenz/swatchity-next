import React from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import Layout from '@/components/pageComponents/Layout';
import { PageMeta } from '@/types';
import { FormattedMessage } from 'react-intl';
import styles from '@/styles/modules/notFound404.module.scss';

const NotFound: NextPage = () => {
  const pageMeta: PageMeta = {
    title: '404 - Not Found',
    metadesc:
      'That thing you are looking for is not here. Why not go back to the home page and try again?',
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div className="contained pt-1 pb-4">
        <div className={styles.numbersWrap}>
          <div className={`${styles.number} ${styles.number1}`}>4</div>
          <div className={`${styles.number} ${styles.number2}`}>0</div>
          <div className={`${styles.number} ${styles.number3}`}>4</div>
        </div>
        <div className={styles.messageWrap}>
          <h1>404: Resource Not Found</h1>
          <Link href="/" className="text-gray-5 dark-text-gray-2 text-1-5">
            <FormattedMessage id="404__return_home" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
