"use strict";

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Drain = /** @class */function () {
    function Drain() {}
    Drain.transfer = function (name) {
        var drainValue = Drain.memory[name];
        var diff;
        var step = 1;
        var staticValues = drainValue.staticValues,
            dynamicValues = drainValue.dynamicValues,
            fromElement = drainValue.fromElement,
            toElement = drainValue.toElement,
            speed = drainValue.speed,
            qua = drainValue.qua;
        var isDefinedStaticToValue = typeof staticValues.to === "number";
        var isDefinedStaticFromValue = typeof staticValues.from === "number";
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
                fromElement.value = drainValue.dynamicValues.from.toString();
            }
            if (toElement) {
                drainValue.dynamicValues.to += step;
                toElement.innerHTML = drainValue.dynamicValues.to.toString();
                toElement.value = drainValue.dynamicValues.to.toString();
            }
            Drain.memory[name] = drainValue;
            if (drainValue.callback) {
                drainValue.callback(drainValue);
            }
            if (diff === 0) {
                if (fromElement) {
                    fromElement.innerHTML = (staticValues.from - qua).toString();
                    fromElement.value = (staticValues.from - qua).toString();
                }
                if (toElement) {
                    toElement.innerHTML = (staticValues.to + qua).toString();
                    toElement.value = (staticValues.to + qua).toString();
                }
                // @ts-ignore
                clearInterval(Drain.process[name]);
                delete Drain.memory[name];
            }
        }
    };
    Drain.process = {};
    Drain.memory = {};
    Drain.createProcessName = function () {
        return "P" + Math.random().toString().split(".")[1];
    };
    Drain.getElementWithValue = function (selector) {
        var element = document.querySelector(selector);
        var elInnerHTML = parseInt(element.innerHTML);
        var elValue = parseInt(element.value);
        var data = {
            element: element,
            value: 0
        };
        if (!isNaN(elInnerHTML)) {
            data.value = elInnerHTML;
        } else if (!isNaN(elValue)) {
            data.value = elValue;
        }
        return data;
    };
    Drain.do = function (data, callback) {
        if (!data || !data.from && !data.to && !data.qua) {
            return;
        }
        var drainValue = __assign({}, data, { dynamicValues: { from: 0, to: 0 }, staticValues: { from: 0, to: 0 } });
        if (!data.name) {
            drainValue.name = Drain.createProcessName();
        }
        if (callback && typeof callback === "function") {
            drainValue.callback = callback;
        }
        var from = drainValue.from,
            to = drainValue.to,
            name = drainValue.name;
        if (typeof from === "string") {
            var data_1 = Drain.getElementWithValue(from);
            drainValue.fromElement = data_1.element;
            drainValue.staticValues.from = data_1.value;
            drainValue.dynamicValues.from = data_1.value;
        } else if (typeof from === "number") {
            drainValue.from = from;
        } else {
            drainValue.from = 0;
        }
        if (typeof to === "string") {
            var data_2 = Drain.getElementWithValue(to);
            drainValue.toElement = data_2.element;
            drainValue.staticValues.to = data_2.value;
            drainValue.dynamicValues.to = data_2.value;
        } else if (typeof to === "number") {
            drainValue.to = to;
        } else {
            drainValue.to = 0;
        }
        Drain.memory[name] = drainValue;
        Drain.process[name] = setInterval(function () {
            Drain.transfer(name);
        }, 100);
    };
    return Drain;
}();