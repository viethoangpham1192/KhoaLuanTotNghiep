import type {
  ReactTestInstance,
  ReactTestRendererJSON,
  ReactTestRendererNode,
} from 'react-test-renderer';

import {getParentOf, getTypeOf, getValueOf} from './getInformation';

function arrayProcess(received: string[], threshold: string[], value: string) {
  for (let i: number = 0; i < received.length; i++) {
    if (received[i] === value) {
      deleteArray(received, value);
      deleteArray(threshold, value);
      break;
    }
  }
}

function deleteArray(array: string[], value: string) {
  const indexToDelete = array.indexOf(value);
  if (indexToDelete !== -1) {
    array.splice(indexToDelete, 1);
  }
}

function receivedToIncludeThreshold(received: string[], threshold: string[]) {
  let pass: boolean = false;
  const _received: string[] = [...received];
  const _threshold: string[] = [...threshold];
  const sizeOfReceived: number = _received.length;
  const sizeOfThreshold: number = _threshold.length;

  if (sizeOfReceived < sizeOfThreshold) {
    pass = false;
  } else {
    for (let i: number = 0; i < sizeOfThreshold; i++) {
      arrayProcess(_received, _threshold, threshold[i]);
    }

    if (_threshold.length === 0) {
      pass = true;
    }
  }

  return pass;
}

function processGetAllText(element: ReactTestInstance | string, arr: string[]) {
  if (typeof element === 'string') {
    arr.push(element);
    return;
  } else if (element && element.children) {
    const child: (string | ReactTestInstance)[] = element.children;
    const length: number = child.length;
    for (let i: number = 0; i < length; i++) {
      processGetAllText(child[i], arr);
    }
  }
}

function processGetAllPlaceholder(
  element: ReactTestInstance | string,
  arr: string[],
) {
  if (typeof element === 'string') {
    return;
  } else if (
    element.type.toString() === 'TextInput' &&
    element.props.placeholder
  ) {
    arr.push(element.props.placeholder);
    return;
  } else if (element && element.children) {
    const child: (string | ReactTestInstance)[] = element.children;
    const length: number = child.length;
    for (let i: number = 0; i < length; i++) {
      processGetAllPlaceholder(child[i], arr);
    }
  }
}

function processGetAllValue(
  element: ReactTestInstance | string,
  arr: (string | boolean | number)[],
) {
  if (typeof element === 'string') {
    return;
  } else {
    if (
      element &&
      element.props.value !== undefined &&
      typeof element.type === 'string'
    ) {
      arr.push(getValueOf(element));
    }
    const child: (string | ReactTestInstance)[] = element.children;
    const length: number = child.length;
    for (let i: number = 0; i < length; i++) {
      processGetAllValue(child[i], arr);
    }
  }
}

function processGetAllTypeOf(json: ReactTestRendererJSON, arr: string[]) {
  if (json && json.type) {
    arr.push(json.type);
  }
  if (json.children) {
    const child: ReactTestRendererNode[] = json.children;
    const length: number = child.length;
    for (let i: number = 0; i < length; i++) {
      processGetAllTypeOf(child[i], arr);
    }
  }
}

function extractObjects(arr: object[]) {
  const result: object[] = [];
  for (const item of arr) {
    if (typeof item === 'object' && !Array.isArray(item)) {
      result.push(item);
    } else if (Array.isArray(item)) {
      result.push(...extractObjects(item));
    }
  }
  return result;
}

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export {
  receivedToIncludeThreshold,
  processGetAllText,
  processGetAllPlaceholder,
  processGetAllValue,
  processGetAllTypeOf,
  extractObjects,
  deepEqual,
  arrayProcess,
};
