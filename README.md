# Drain.js

A callback based utility for making fluent number changes.

## Install

```sh
npm install drain-js
```

## Usage

`drain(start: Number, end: Number, callback: Function)`

### Sample

```js
import drain from 'drain-js';

drain(3000, 2750, console.log);

// Output
2901
2802
2793
...
2752
2751
2750
```
