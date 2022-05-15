import { FunctionComponent, useCallback, useState } from 'react';
import {
  PAGINATION_DEFAULT_PAGE_START,
  PAGINATION_DEFAULT_TAKE,
} from '@dots.cool/tokens';

const withSmartPagination = (
  Component: FunctionComponent<any>,
  {
    initPage = PAGINATION_DEFAULT_PAGE_START,
    initTake = PAGINATION_DEFAULT_TAKE,
  } = {}
): FunctionComponent<any> => {
  const PaginatedComponent = (props: any) => {
    const [page, setPage] = useState(initPage);
    const [take, setTake] = useState(initTake);

    const skip = (page - 1) * take;

    const handlePageNext = useCallback((maxPage) => {
      setPage((current) => Math.min(current + 1, maxPage));
    }, []);

    const handlePagePrevious = useCallback((minPage) => {
      setPage((current) => Math.max(minPage, current - 1));
    }, []);

    const handleGoTo = useCallback((page, minPage = null, maxPage = null) => {
      if (!minPage || !maxPage) {
        setPage(page);
        return;
      }
      setPage(Math.max(minPage, Math.min(page, maxPage)));
    }, []);

    const methods = {
      page,
      take,
      skip,
      onPageNext: handlePageNext,
      onPagePrevious: handlePagePrevious,
      onGoTo: handleGoTo,
      onTakeChange: setTake,
    };
    return <Component {...props} {...methods} />;
  };

  return PaginatedComponent;
};

export default withSmartPagination;
