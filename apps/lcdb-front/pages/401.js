import { useEffect } from 'react';
import { gtm } from '../src/lib/gtm';

const AuthorizationRequired = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return <></>;
};

export default AuthorizationRequired;
