# Drain.js
Cool number action for UI


### Easly Usage

#### Example 1
##### Html
```html
<span class="from">30000</span>
<span class="to">70000</span>
```
##### Javascript
```js
Drain.do({ from: '.from', to: '.to', qua: 30000 });
```

##### Result
![Drain.js Example](https://github.com/aykutkardas/Drain.js/blob/master/img/bigFromToQua.gif.gif?raw=true)

#### Example 2
##### Html
```html
<span class="from">300</span>
```
##### Javascript
```js
Drain.do({ from: '.from', qua: 100 });
```

##### Result
![Drain.js Example](https://github.com/aykutkardas/Drain.js/blob/master/img/fromQua.gif.gif?raw=true)


#### Example 3
##### Html
```html
<span class="to">500</span>
```
##### Javascript
```js
Drain.do({ to: '.to', qua: 100 });
```

##### Result
![Drain.js Example](https://github.com/aykutkardas/Drain.js/blob/master/img/toQua.gif.gif.gif?raw=true)
