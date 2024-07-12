import React from 'react';
import { makePubsSnapshot } from '../utils/firebase';
import { Publication, PublicationOrderFields, PublicationContextData } from '../../types';

const setterStub = () => {
  throw new Error('Function not implemented.');
};

export const PublicationContext = React.createContext({
  pubs: [],
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
  },
} as PublicationContextData);

export function PublicationsProvider({ children }: React.PropsWithChildren) {
  const [pubs, setPubs] = React.useState<Publication[]>([]);
  const [titleFilters, setTitleFilters] = React.useState<string[]>([]);
  const [authorFilters, setAuthorFilters] = React.useState<string[]>([]);
  const [yearMin, setYearMin] = React.useState<number | undefined>();
  const [yearMax, setYearMax] = React.useState<number | undefined>();
  const [orderByField, setOrderByField] = React.useState<PublicationOrderFields>('title');
  const [orderByDir, setOrderByDir] = React.useState<'asc' | 'desc'>('desc');
  const setOrderBy = React.useCallback(
    ({ field, dir }: { field: PublicationOrderFields; dir: 'asc' | 'desc' }) => {
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
    ]
  );

  React.useEffect(() => {
    return makePubsSnapshot(setPubs, filterData);
  }, [filterData]);

  const contextData = React.useMemo(() => ({ ...filterData, pubs }), [pubs, filterData]);

  return <PublicationContext.Provider value={contextData}>{children}</PublicationContext.Provider>;
}

export function usePublicationContext() {
  return React.useContext(PublicationContext);
}
