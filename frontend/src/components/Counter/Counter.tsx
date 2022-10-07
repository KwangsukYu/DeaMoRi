import React, { useState, useRef, useEffect } from "react";
import "./Counter.scss";
import { numberWithCommas } from "utils/numberComma";

interface CounterProps {
  end: number;
  timer: number;
}

function Counter({ end, timer }: CounterProps) {
  const [state, setState] = useState<null | number | string>(null);
  const ref = useRef(0);

  const accumulator = end / 200;

  const updateCounerState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) return setState(numberWithCommas(end));
      ref.current = result;
      setState(numberWithCommas(result));
    }
    setTimeout(updateCounerState, timer);
    return 0;
  };

  useEffect((): any => {
    let isMounted = true;
    if (isMounted) {
      updateCounerState();
    }
    function ended() {
      isMounted = false;
    }
    return ended();
  }, [end]);

  return <div id="counter">{state}</div>;
}

export default Counter;
