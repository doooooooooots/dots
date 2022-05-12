import { useEffect } from 'react';

export default function useWarnBeforeQuitting() {
  useEffect(() => {
    const callBack = (event) => {
      var e = event || window.event;
      if (e) e.returnValue = 'Non';
      return 'Non';
    };
    window.addEventListener('beforeunload', callBack);
    return () => {
      window.removeEventListener('beforeunload', callBack);
    };
  }, []);
}
