interface Option {
  value: any;
  label: string;
}

export interface QuickFilter {
  column: string;
  label: string;
  type: string;
  options: Option[];
}
