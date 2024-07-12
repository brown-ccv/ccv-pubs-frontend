export interface Publication {
  title: string;
  author: string;
  publisher: string;
  url: string;
  doi: string;
  month: number;
  year: number;
  abstract: string;
}

export interface User {
  displayName: string;
  email: string;
  ccv: boolean;
  updatedAt: number;
}

/*export type Publication = {
  abstract: string;
  author: string; 
  doi: string;
  id: number;
  month: number;
  title: string;
  updatedAt: Timestamp;
  url: string;
  year: number;
};*/

export type PublicationOrderFields = 'title' | 'author' | 'year';
export type PublicationOrderDirs = 'asc' | 'desc';
export type PublicationOrderOpts = {
  field: PublicationOrderFields;
  dir: PublicationOrderDirs;
};

export type PublicationFilters = {
  filters: { title: string[]; author: string[]; year: { min?: number; max?: number } };
  orderBy: PublicationOrderOpts;
};

export type PublicationContextData = PublicationFilters & {
  pubs: Publication[];
  setters: {
    setTitleFilters: (newTitleFilters: string[]) => void;
    setAuthorFilters: (newTitleFilters: string[]) => void;
    setYearMin: (yearMin: number | undefined) => void;
    setYearMax: (yearMax: number | undefined) => void;
    setOrderBy: (orderBy: PublicationOrderOpts) => void;
  };
};
