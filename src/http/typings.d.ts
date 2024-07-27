interface R<T = any> {
  code: number;
  msg: string;
  data: T;
}

interface List<T = any> {
  list: T[];
  total: number;
}

interface Pagination {
  current?: number;
  pageSize?: number;
  [x: string]: any;
}

type IAnyObject = Record<string, any>;
