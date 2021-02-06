# Drain.js

A callback based utility for making fluent number changes.

### [Demo](https://codesandbox.io/s/drain-js-react-demo-crzyu)

---

## Install

```sh
npm install drain-js
```

## Usage

```ts
drain({ 
    start: Number, 
    end: Number, 
    onInterval?: Function, 
    onComplete?: Function 
});
```

### Sample

```js
import drain from 'drain-js';

drain({ start: 3000, end: 2750, onInterval: console.log });

// Output
2906
2812
2803
...
2752
2751
2750
```
