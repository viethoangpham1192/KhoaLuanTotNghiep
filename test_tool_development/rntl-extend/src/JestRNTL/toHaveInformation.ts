import type { ReactTestInstance } from "react-test-renderer";
import {
  getAllPlaceholderOf,
  getAllTextOf,
  getAllTypeOf,
  getAllValueOf,
} from "../GetInformation/getAllInformation";
import { receivedToIncludeThreshold } from "../utils";
import { getParentOf, getPropsOf } from "../GetInformation";

function toHaveText(received: ReactTestInstance, threshold: string | string[]) {
  const receivedArray: string[] = getAllTextOf(received);
  let pass: boolean = false;

  if (Array.isArray(threshold)) {
    pass = receivedToIncludeThreshold(receivedArray, threshold);
  } else {
    pass = receivedToIncludeThreshold(receivedArray, [threshold]);
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to have text ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not to have text ${threshold}`,
      pass: false,
    };
  }
}

function toHavePlaceholder(
  received: ReactTestInstance,
  threshold: string | string[]
) {
  const receivedArray: string[] = getAllPlaceholderOf(received);
  let pass: boolean = false;

  if (Array.isArray(threshold)) {
    pass = receivedToIncludeThreshold(receivedArray, threshold);
  } else {
    pass = receivedToIncludeThreshold(receivedArray, [threshold]);
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to have placeholder ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `Expected ${received} not to have placeholder ${threshold}`,
      pass: false,
    };
  }
}

function toHaveType(received: ReactTestInstance, threshold: string | string[]) {
  const receivedArray: string[] = getAllTypeOf(received);
  let pass: boolean = false;

  if (Array.isArray(threshold)) {
    pass = receivedToIncludeThreshold(receivedArray, threshold);
  } else {
    pass = receivedToIncludeThreshold(receivedArray, [threshold]);
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to have type ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not to have type ${threshold}`,
      pass: false,
    };
  }
}

function toIncludeComponent(
  this: jest.MatcherContext,
  received: ReactTestInstance,
  threshold: ReactTestInstance
) {
  let pass: boolean = false;
  let parent: ReactTestInstance | null = getParentOf(threshold);

  while (parent) {
    if (this.equals(received, parent)) {
      pass = true;
      parent = null;
    } else {
      parent = getParentOf(parent);
    }
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to be parent of ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} to be not parent of ${threshold}`,
      pass: false,
    };
  }
}

function toHaveProps(
  this: jest.MatcherContext,
  received: ReactTestInstance,
  threshold: object
) {
  let pass: boolean = false;
  const obj1: Record<string, any> = getPropsOf(received);
  let obj: Record<string, any> = { ...threshold };

  for (let key in threshold) {
    if (this.equals(obj1[key], obj[key])) {
      delete obj[key];
    }
  }

  pass = Object.keys(obj).length === 0;

  if (pass) {
    return {
      message: () => `Expected ${received} to have prop ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} to be not have props ${threshold}`,
      pass: false,
    };
  }
}

function toHaveValue(
  this: jest.MatcherContext,
  received: ReactTestInstance,
  threshold: (string | boolean | number)[] | string | boolean | number
) {
  let pass: boolean = false;
  if (typeof threshold === "object") {
    const r = JSON.stringify(getAllValueOf(received));
    let arr = [...threshold];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (r.includes(JSON.stringify(arr[i]))) {
        arr.splice(i, 1);
      }
    }
    pass = arr.length === 0;
  } else {
    const r = JSON.stringify(getAllValueOf(received));
    pass = r.includes(threshold.toString());
  }

  if (pass) {
    return {
      message: () => `Expected ${received} to have value ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} to be not have value ${threshold}`,
      pass: false,
    };
  }
}

export {
  toHaveText,
  toHavePlaceholder,
  toHaveType,
  toIncludeComponent,
  toHaveProps,
  toHaveValue,
};
