type ProcessType = { [name: string]: Object };
type MemoryType = { [name: string]: Object };

type DrainInput = {
  from?: string | number;
  to?: string | number;
  qua?: number;
  name?: string;
  speed?: number;
};

type DrainValue = {
  from?: string | number;
  to?: string | number;
  qua?: number;
  name?: string;
  callback?: Function;
  speed?: number;

  fromElement?: HTMLElement | HTMLInputElement;
  toElement?: HTMLElement | HTMLInputElement;

  staticValues?: {
    from: number;
    to: number;
  };

  dynamicValues?: {
    from: number;
    to: number;
  };
};

type DoMethodType = (data: DrainInput, callback: Function) => void;

type GetElementWithValue = {
  element: HTMLInputElement | HTMLElement;
  value: number;
};
type GetElementWithValueMethodType = (selector: string) => GetElementWithValue;

export {
  ProcessType,
  MemoryType,
  DrainInput,
  DrainValue,
  DoMethodType,
  GetElementWithValue,
  GetElementWithValueMethodType
};
