/* 
	"Drain.js"
    Author: Aykut Kardaş
    Github: github.com/aykutkardas
*/


var Drain = Drain || {};

Drain.process = {};

Drain.memory = {};

Drain.do = function (data, callback) {


    if (!data || (!data.from && !data.to && !data.qua))
        return false;


    if (!data.name)
        data.name = "P" + Math.random().toString().split('.')[1];


    if (callback)
        data.callback = callback;


    if (data.from) {
        data.fromElement      = document.querySelector(data.from);
        data.staticFromValue  = parseInt(data.fromElement.innerHTML || data.fromElement.value);
        data.dynamicFromValue = parseInt(data.fromElement.innerHTML || data.fromElement.value);
    }



    if (data.to) {
        data.toElement      = document.querySelector(data.to);
        data.staticToValue  = parseInt(data.toElement.innerHTML || data.toElement.value);
        data.dynamicToValue = parseInt(data.toElement.innerHTML || data.toElement.value);
    }


    Drain.memory[data.name] = data;

    Drain.process[data.name] = setInterval(function () {
        transfer(data.name);
    }, (data.speed || 100));

    function transfer(name) {

        var data = Drain.memory[name];
        var diff;
        var step = 1;

        if (data.staticToValue && data.qua)
            diff = (data.qua + data.staticToValue) - data.dynamicToValue;
        else if (data.staticFromValue && data.qua)
            diff = (data.staticFromValue - data.qua) - data.dynamicFromValue;

        if ((data.staticToValue || data.staticFromValue) && data.qua) {

            if (diff > 10000 || diff < -10000)
                step = 9999;
            else if (diff > 1000 || diff < -1000)
                step = 999;
            else if (diff > 100 || diff < -100)
                step = 99;
            else if (diff > 10 || diff < -10)
                step = 9;

            if (data.fromElement) {
                data.dynamicFromValue -= step;
                data.fromElement.innerHTML = data.dynamicFromValue;
                data.fromElement.value = data.dynamicFromValue;
            }

            if (data.toElement) {
                data.dynamicToValue += step;
                data.toElement.innerHTML = data.dynamicToValue;
                data.toElement.value = data.dynamicToValue;
            }

            if (diff == 0) {
                if (data.fromElement) {
                    data.fromElement.innerHTML = (data.staticFromValue - data.qua);
                    data.fromElement.value = (data.staticFromValue - data.qua);
                }

                if (data.toElement) {
                    data.toElement.innerHTML = (data.staticToValue + data.qua);
                    data.toElement.value = (data.staticToValue + data.qua);
                }

                clearInterval(Drain.process[name]);

                if (data.callback) data.callback();
                delete Drain.memory[data.name];

            }

        }

    }


}