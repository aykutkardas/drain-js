// var Drain = Drain || {};

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

class Drain {
  static process: ProcessType = {};
  static memory: MemoryType = {};

  static createProcessName = (): string =>
    "P" +
    Math.random()
      .toString()
      .split(".")[1];

  static do: DoMethodType = (data, callback) => {
    if (!data) {
      return;
    }

    if (!data.from && !data.to && !data.qua) {
      return;
    }

    const drainValue: DrainValue = { ...data };

    if (!data.name) {
      drainValue.name = Drain.createProcessName();
    }

    if (callback && typeof callback === "function") {
      drainValue.callback = callback;
    }

    const { from, to, name } = drainValue;

    drainValue.staticValues = { from: 0, to: 0 };
    drainValue.dynamicValues = { from: 0, to: 0 };

    if (typeof from === "string") {
      const element = document.querySelector(from);
      const innerHTML = parseInt(element.innerHTML);
      const value = parseInt((<HTMLInputElement>element).value);

      drainValue.fromElement = <HTMLElement>element;
      if (!isNaN(innerHTML)) {
        drainValue.staticValues.from = innerHTML;
        drainValue.dynamicValues.from = innerHTML;
      } else if (!isNaN(value)) {
        drainValue.staticValues.from = value;
        drainValue.dynamicValues.from = value;
      }
    }

    if (typeof to === "string") {
      const element = document.querySelector(to);
      const innerHTML = parseInt(element.innerHTML);
      const value = parseInt((<HTMLInputElement>element).value);

      drainValue.toElement = <HTMLElement>element;
      if (!isNaN(innerHTML)) {
        drainValue.staticValues.to = innerHTML;
        drainValue.dynamicValues.to = innerHTML;
      } else if (!isNaN(value)) {
        drainValue.staticValues.to = value;
        drainValue.dynamicValues.to = value;
      }
    }

    Drain.memory[name] = drainValue;
    Drain.process[name] = setInterval(() => {
      Drain.transfer(name);
    }, drainValue.speed || 100);
  };

  static transfer(name: string) {
    const drainValue: DrainValue = Drain.memory[name];
    console.log(drainValue.dynamicValues.from);
    let diff: number;
    let step: number = 1;

    const {
      staticValues,
      dynamicValues,
      fromElement,
      toElement,
      qua
    } = drainValue;

    const isDefinedStaticToValue = typeof staticValues.to === "number";
    const isDefinedStaticFromValue = typeof staticValues.from === "number";

    if (isDefinedStaticToValue && qua) {
      diff = qua + staticValues.to - dynamicValues.to;
    } else if (isDefinedStaticFromValue && qua) {
      diff = staticValues.from - qua - dynamicValues.from;
    }

    if ((isDefinedStaticToValue || isDefinedStaticFromValue) && qua) {
      if (diff > 10000 || diff < -10000) step = 9999;
      else if (diff > 1000 || diff < -1000) step = 999;
      else if (diff > 100 || diff < -100) step = 99;
      else if (diff > 10 || diff < -10) step = 9;

      if (fromElement) {
        drainValue.dynamicValues.from -= step;
        fromElement.innerHTML = drainValue.dynamicValues.from.toString();
        (<HTMLInputElement>(
          fromElement
        )).value = drainValue.dynamicValues.from.toString();
      }

      if (toElement) {
        drainValue.dynamicValues.to += step;
        toElement.innerHTML = drainValue.dynamicValues.to.toString();
        (<HTMLInputElement>(
          toElement
        )).value = drainValue.dynamicValues.to.toString();
      }

      Drain.memory[name] = drainValue;

      if (diff === 0) {
        if (fromElement) {
          fromElement.innerHTML = (staticValues.from - qua).toString();
          (<HTMLInputElement>fromElement).value = (
            staticValues.from - qua
          ).toString();
        }
        if (toElement) {
          toElement.innerHTML = (staticValues.to + qua).toString();
          (<HTMLInputElement>toElement).value = (
            staticValues.to + qua
          ).toString();
        }

        // @ts-ignore
        clearInterval(Drain.process[name]);

        if (drainValue.callback) {
          drainValue.callback(drainValue);
        }

        delete Drain.memory[name];
      }
    }
  }
}
