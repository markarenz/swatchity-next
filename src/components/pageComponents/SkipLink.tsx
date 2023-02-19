import React from 'react';
import { FormattedMessage } from 'react-intl';

const SkipLink = () => (
  <a href="main-content" className="skip-link">
    <FormattedMessage id="skip_to_main" />
  </a>
);
export default SkipLink;
