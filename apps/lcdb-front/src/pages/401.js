import { useEffect } from 'react';
import { gtm } from '../lib/gtm';

const AuthorizationRequired = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return <></>;
};

export default AuthorizationRequired;
