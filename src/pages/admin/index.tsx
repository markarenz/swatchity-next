import React from 'react';
import type { NextPage } from 'next';
import { subNavLinksAdmin } from '@/constants';
import { PageMeta } from '@/types';
import Layout from '@/components/pageComponents/Layout';
import AdminProtected from '@/components/common/AdminProtected';

const AdminHome: NextPage = () => {
  const pageMeta: PageMeta = {
    title: 'CMS',
    metadesc: 'This is the CMS root page for doing CMS things.',
  };
  return (
    <Layout pageMeta={pageMeta} subNavData={subNavLinksAdmin}>
      <AdminProtected>
        <div className="contained py-2">
          <h1>{pageMeta.title}</h1>
          <div>{pageMeta.metadesc}</div>
        </div>
      </AdminProtected>
    </Layout>
  );
};

export default AdminHome;
