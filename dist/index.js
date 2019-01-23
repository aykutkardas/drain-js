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
        console.log(drainValue.dynamicValues.from);
        var diff;
        var step = 1;
        var staticValues = drainValue.staticValues,
            dynamicValues = drainValue.dynamicValues,
            fromElement = drainValue.fromElement,
            toElement = drainValue.toElement,
            qua = drainValue.qua;
        var isDefinedStaticToValue = typeof staticValues.to === "number";
        var isDefinedStaticFromValue = typeof staticValues.from === "number";
        if (isDefinedStaticToValue && qua) {
            diff = qua + staticValues.to - dynamicValues.to;
        } else if (isDefinedStaticFromValue && qua) {
            diff = staticValues.from - qua - dynamicValues.from;
        }
        if ((isDefinedStaticToValue || isDefinedStaticFromValue) && qua) {
            var isNegative = diff < 0;
            step = isNegative ? -diff : diff;
            var newDiff = diff.toString().replace(/./gmi, "9");
            step = parseInt(newDiff.slice(0, newDiff.length - 1));
            step = isNaN(step) ? 1 : step;
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
                if (drainValue.callback) {
                    drainValue.callback(drainValue);
                }
                delete Drain.memory[name];
            }
        }
    };
    Drain.process = {};
    Drain.memory = {};
    Drain.createProcessName = function () {
        return "P" + Math.random().toString().split(".")[1];
    };
    Drain.do = function (data, callback) {
        if (!data) {
            return;
        }
        if (!data.from && !data.to && !data.qua) {
            return;
        }
        var drainValue = __assign({}, data);
        if (!data.name) {
            drainValue.name = Drain.createProcessName();
        }
        if (callback && typeof callback === "function") {
            drainValue.callback = callback;
        }
        var from = drainValue.from,
            to = drainValue.to,
            name = drainValue.name;
        drainValue.staticValues = { from: 0, to: 0 };
        drainValue.dynamicValues = { from: 0, to: 0 };
        if (typeof from === "string") {
            var element = document.querySelector(from);
            var innerHTML = parseInt(element.innerHTML);
            var value = parseInt(element.value);
            drainValue.fromElement = element;
            if (!isNaN(innerHTML)) {
                drainValue.staticValues.from = innerHTML;
                drainValue.dynamicValues.from = innerHTML;
            } else if (!isNaN(value)) {
                drainValue.staticValues.from = value;
                drainValue.dynamicValues.from = value;
            }
        }
        if (typeof to === "string") {
            var element = document.querySelector(to);
            var innerHTML = parseInt(element.innerHTML);
            var value = parseInt(element.value);
            drainValue.toElement = element;
            if (!isNaN(innerHTML)) {
                drainValue.staticValues.to = innerHTML;
                drainValue.dynamicValues.to = innerHTML;
            } else if (!isNaN(value)) {
                drainValue.staticValues.to = value;
                drainValue.dynamicValues.to = value;
            }
        }
        Drain.memory[name] = drainValue;
        Drain.process[name] = setInterval(function () {
            Drain.transfer(name);
        }, drainValue.speed || 100);
    };
    return Drain;
}();