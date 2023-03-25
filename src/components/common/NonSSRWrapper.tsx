import dynamic from 'next/dynamic';
import React from 'react';

type Props = {
  children: JSX.Element;
};
const NonSSRWrapper: React.FC<Props> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
