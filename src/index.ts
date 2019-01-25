class Drain {
  static process: ProcessType = {};
  static memory: MemoryType = {};

  static createProcessName = (): string =>
    "P" +
    Math.random()
      .toString()
      .split(".")[1];

  static getElementWithValue: GetElementWithValueMethodType = selector => {
    const element = <HTMLInputElement | HTMLElement>(
      document.querySelector(selector)
    );
    const elInnerHTML = parseInt(element.innerHTML);
    const elValue = parseInt((<HTMLInputElement>element).value);

    const data = {
      element,
      value: 0
    };

    if (!isNaN(elInnerHTML)) {
      data.value = elInnerHTML;
    } else if (!isNaN(elValue)) {
      data.value = elValue;
    }

    return data;
  };

  static do: DoMethodType = (data, callback) => {
    if (!data || (!data.from && !data.to && !data.qua)) {
      return;
    }

    const drainValue: DrainValue = {
      ...data,
      dynamicValues: { from: 0, to: 0 },
      staticValues: { from: 0, to: 0 }
    };

    if (!data.name) {
      drainValue.name = Drain.createProcessName();
    }

    if (callback && typeof callback === "function") {
      drainValue.callback = callback;
    }

    const { from, to, name } = drainValue;

    if (typeof from === "string") {
      const data = Drain.getElementWithValue(from);
      drainValue.fromElement = data.element;
      drainValue.staticValues.from = data.value;
      drainValue.dynamicValues.from = data.value;
    } else if (typeof from === "number") {
      drainValue.from = from;
    } else {
      drainValue.from = 0;
    }

    if (typeof to === "string") {
      const data = Drain.getElementWithValue(to);
      drainValue.toElement = data.element;
      drainValue.staticValues.to = data.value;
      drainValue.dynamicValues.to = data.value;
    } else if (typeof to === "number") {
      drainValue.to = to;
    } else {
      drainValue.to = 0;
    }

    Drain.memory[name] = drainValue;
    Drain.process[name] = setInterval(() => {
      Drain.transfer(name);
    }, 100);
  };

  static transfer(name: string) {
    const drainValue: DrainValue = Drain.memory[name];
    let diff: number;
    let step: number = 1;

    const {
      staticValues,
      dynamicValues,
      fromElement,
      toElement,
      speed,
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
      step = qua / (speed / 100);

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

      if (drainValue.callback) {
        drainValue.callback(drainValue);
      }

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

        delete Drain.memory[name];
      }
    }
  }
}

import {
  ProcessType,
  MemoryType,
  GetElementWithValueMethodType,
  DoMethodType,
  DrainValue
} from "./index.d";
