import {receivedToIncludeThreshold, arrayProcess} from './utils';

export function toInclude(received: string[], threshold: string[]) {
  let pass: boolean = receivedToIncludeThreshold(received, threshold);

  if (pass) {
    return {
      message: () => `Expected ${received} to include ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not to include ${threshold}`,
      pass: false,
    };
  }
}

export function toEqualInPairs(received: string[], threshold: string[]) {
  let pass: boolean = false;
  const _received: string[] = [...received];
  const _threshold: string[] = [...threshold];
  const sizeOfReceived: number = _received.length;
  const sizeOfThreshold: number = _threshold.length;

  if (sizeOfReceived !== sizeOfThreshold) {
    pass = false;
  } else {
    for (let i: number = 0; i < sizeOfThreshold; i++) {
      arrayProcess(_received, _threshold, threshold[i]);
    }

    if (_received.length === 0 && _threshold.length === 0) {
      pass = true;
    }
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to equal in pairs with ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `Expected ${received} not to equal in pairs with ${threshold}`,
      pass: false,
    };
  }
}
