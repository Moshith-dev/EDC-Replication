export type TTableLoaderDetail = Record<string, boolean>;

export type TButtonAction = () => void | boolean | Promise<void> | Promise<boolean>;

export interface IColumn {
    header: string; 
    field: string;   
    sortable?: boolean;  
  }
  
  export type TTableItem<T = any> = {
    [key: string]: T;  
  };

export type TNullableString = string | null;
export type TNullableNumber = number | null;

export type TOptionValue = {
    value: string | number; 
    label: string;          
};