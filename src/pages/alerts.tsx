import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '@/components/pageComponents/Layout';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import { serializeAlerts, getAlerts } from '@/utils/apiFunctions';
import { getAlertsDB } from '@/utils/dbFunctions';
import { PageMeta } from '@/types';
import { FormattedMessage } from 'react-intl';
import TimeSince from '@/components/common/TimeSince';
import IconLink from '@/components/icons/IconLink';
import { Alert } from '@prisma/client';
import ButtonIcon from '@/components/common/ButtonIcon';
import IconRefresh from '@/components/icons/IconRefresh';

type Props = {
  initialAlerts: Alert[];
};
const AlertsPage: NextPage<Props> = ({ initialAlerts }) => {
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { userMeta } = useUserContext();
  const { formatMessage } = useIntl();
  const pageMeta: PageMeta = {
    title: 'Alerts',
    metadesc: 'Hey! Something important happened, and we need to alert you.',
  };

  const isLoggedIn = userMeta?.id;
  const showNoAlerts = isLoggedIn && (!alerts || (alerts && alerts.length === 0));
  const showNotLoggedIn = !isLoggedIn;

  useEffect(() => {
    if (typeof window !== 'undefined' && lastVisit === null) {
      const newLastVisit = localStorage.getItem('lastAlertView') || '';
      setLastVisit(newLastVisit);
    }
    return () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastAlertView', new Date().toISOString());
      }
    };
  }, []);

  const refreshAlerts = () => {
    setCanLoadMore(true);
    setAlerts([]);
    loadAlerts(0);
  };
  const loadMoreAlerts = () => {
    loadAlerts(alerts.length);
  };
  const loadAlerts = async (sk: number) => {
    if (userMeta?.id) {
      setIsLoading(true);
      const newAlertsData = await getAlerts(`${userMeta?.id}`, sk);
      const { alerts: newAlerts } = newAlertsData;
      if (sk > 0) {
        setAlerts([...alerts, ...newAlerts]);
      } else {
        setAlerts(newAlerts);
      }
      if (newAlerts.length === 0) {
        setCanLoadMore(false);
      }
      setIsLoading(false);
    }
  };
  const headerButtons = (
    <ButtonIcon
      onClick={refreshAlerts}
      label={formatMessage({ id: 'feed__refresh' })}
      testID="btn-refresh"
    >
      <div key="btn-refresh" className="hover-zoom h-3 w-3 py-0-5 px-0-5">
        <IconRefresh color="gray-6" colorDark="gray-2" />
      </div>
    </ButtonIcon>
  );

  const lastVisitStr = lastVisit || '';
  return (
    <Layout pageMeta={pageMeta} headerButtons={headerButtons}>
      <div id="alerts-page">
        <div className="contained pt-1 pb-4">
          <h1 className="text-3">
            <FormattedMessage id="alerts__title" />
          </h1>
          <div className="mb-1 italic">
            <p>
              <FormattedMessage id="alerts__intro" />
            </p>
          </div>

          {alerts?.map((alert) => (
            <div key={alert.id} className="mb-1">
              {alert.alertType === 'reply' && (
                <div
                  className={`px-1 py-1 round-1 ${
                    `${alert.createdAt}` > lastVisitStr
                      ? 'bg-red dark-bg-base'
                      : 'bg-gray-3 dark-bg-gray-5'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-grow text-gray-1 dark-text-gray-2">
                      <FormattedMessage id={'alerts__templates__reply_1'} />{' '}
                      <span className="bold uppercase">swatchity</span>{' '}
                      <FormattedMessage id={'alerts__templates__reply_2'} />{' '}
                      <TimeSince inputDate={alert.createdAt} />
                    </div>
                    <div>
                      <Link href={alert.link} aria-label="view" prefetch={false}>
                        <div className="hover-zoom h-4 w-4 py-1 px-1 round">
                          <IconLink color="gray-1" colorDark="gray-2" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {showNotLoggedIn && (
            <h2>
              <FormattedMessage id="alerts__not_logged_in" />
            </h2>
          )}
          {showNoAlerts && (
            <h2>
              <FormattedMessage id="alerts__no_results" />
            </h2>
          )}
          {canLoadMore && !showNotLoggedIn && (
            <div className="w-full py-1">
              <button
                onClick={loadMoreAlerts}
                className="btn margin-center"
                data-testid="feed-load-more"
              >
                <FormattedMessage id="feed__load_more" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { alerts: alertsRaw } = await getAlertsDB(session, 0);
  const initialAlerts = serializeAlerts(alertsRaw);
  return {
    props: {
      initialAlerts,
    },
  };
};

export default AlertsPage;
