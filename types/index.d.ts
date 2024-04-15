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
