type drainArgs = {
  start: number;
  end: number;
  speed?: number;
  onInterval?: Function;
  onComplete?: Function;
};

function drain({ start, end, onInterval, onComplete, speed = 100 }: drainArgs) {
  let diff = Math.abs(end - start);
  let direction = end - start > 0 ? "up" : "down";
  let step = 1;

  if (diff > 10000) step = 9494;
  else if (diff > 1000) step = 949;
  else if (diff > 100) step = 94;
  else if (diff > 10) step = 9;

  if (diff === 0) {
    if (typeof onComplete === "function") {
      onComplete(start);
    }
    return;
  }

  if (direction === "up") {
    start += step;
  } else {
    start -= step;
  }

  if (typeof onInterval === "function") {
    onInterval(start);
  }

  setTimeout(() => {
    drain({ start, end, onInterval, onComplete, speed });
  }, speed);
}

export default drain;
