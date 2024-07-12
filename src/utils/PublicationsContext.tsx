import React from 'react';
import { PaginationState } from '@tanstack/react-table';
import {
  Publication,
  PublicationOrderFields,
  PublicationContextData,
  PublicationOrderOpts,
  PublicationOrderDirs,
  SnapshotDocs,
} from '../../types';
import { makePubsSnapshot } from './firebase.ts';

const setterStub = () => {
  throw new Error('Function not implemented.');
};

export const PublicationContext = React.createContext({
  pubs: [],
  count: 0,
  filters: {
    title: [],
    author: [],
    year: {
      min: undefined,
      max: undefined,
    },
  },
  orderBy: {
    field: 'title',
    dir: 'desc',
  },
  setters: {
    setTitleFilters: setterStub,
    setAuthorFilters: setterStub,
    setYearMin: setterStub,
    setYearMax: setterStub,
    setOrderBy: setterStub,
    setPagination: setterStub,
  },
  pagination: { pageIndex: 0, pageSize: 10 },
} as PublicationContextData);

export function PublicationsProvider({ children }: React.PropsWithChildren) {
  const [pubs, setPubs] = React.useState<Publication[]>([]);
  const [pubsTotal, setPubsTotal] = React.useState<number>(0);
  const [pubCheckpoints, setPubsCheckpoints] = React.useState<SnapshotDocs>([]);
  const [titleFilters, setTitleFilters] = React.useState<string[]>([]);
  const [authorFilters, setAuthorFilters] = React.useState<string[]>([]);
  const [yearMin, setYearMin] = React.useState<number | undefined>();
  const [yearMax, setYearMax] = React.useState<number | undefined>();
  const [orderByField, setOrderByField] = React.useState<PublicationOrderFields>('title');
  const [orderByDir, setOrderByDir] = React.useState<PublicationOrderDirs>('desc');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  console.log({ pagination, pubsTotal });

  const setOrderBy = React.useCallback(
    ({ field, dir }: PublicationOrderOpts) => {
      setOrderByField(field);
      setOrderByDir(dir);
    },
    [setOrderByField, setOrderByDir]
  );
  const filterData = React.useMemo(
    () =>
      ({
        filters: {
          title: titleFilters,
          author: authorFilters,
          year: {
            min: yearMin,
            max: yearMax,
          },
        },
        orderBy: {
          field: orderByField,
          dir: orderByDir,
        },
        setters: {
          setTitleFilters,
          setAuthorFilters,
          setYearMin,
          setYearMax,
          setOrderBy,
          setPagination,
        },
      }) as Exclude<PublicationContextData, 'pubs'>,
    [
      titleFilters,
      authorFilters,
      yearMax,
      yearMin,
      orderByField,
      orderByDir,
      setTitleFilters,
      setAuthorFilters,
      setYearMin,
      setYearMax,
      setOrderBy,
      setPagination,
    ]
  );

  /**
   * Whenever the filter properties change, reset the page index to zero...?
   */
  React.useEffect(() => {
    setPubsCheckpoints([]);
    setPagination({ ...pagination, pageIndex: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  React.useEffect(() => {
    console.log({ filters: filterData.filters });
    return makePubsSnapshot(
      setPubs,
      setPubsTotal,
      filterData,
      pagination,
      pubCheckpoints,
      setPubsCheckpoints
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, pagination]);

  const contextData = React.useMemo(
    () => ({ ...filterData, pubs, count: pubsTotal, pagination }),
    [pubs, pagination, filterData, pubsTotal]
  );

  return <PublicationContext.Provider value={contextData}>{children}</PublicationContext.Provider>;
}

export function usePublicationContext() {
  return React.useContext(PublicationContext);
}
