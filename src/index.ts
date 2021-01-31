function drain(val, newVal, callback: Function) {
  let start: number = parseInt(val, 0);
  let end: number = parseInt(newVal, 0);

  let diff = Math.abs(end - start);
  let direction = end - start > 0 ? "up" : "down";
  let step = 1;

  if (diff > 10000) step = 9999;
  else if (diff > 1000) step = 999;
  else if (diff > 100) step = 99;
  else if (diff > 10) step = 9;

  if (diff === 0) {
    return;
  }

  if (direction === "up") {
    start += step;
  } else {
    start -= step;
  }

  callback(start);

  setTimeout(() => {
    drain(start, end, callback);
  }, 100);
}

export default drain;
