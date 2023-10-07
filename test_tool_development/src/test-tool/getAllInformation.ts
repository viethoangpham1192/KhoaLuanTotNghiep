import {screen} from '@testing-library/react-native';
import type {
  ReactTestInstance,
  ReactTestRendererJSON,
} from 'react-test-renderer';

import {
  processGetAllText,
  processGetAllPlaceholder,
  processGetAllValue,
  processGetAllTypeOf,
} from './utils';

function getAllTextOf(element: ReactTestInstance) {
  const arr: string[] = [];
  processGetAllText(element, arr);
  return arr;
}

function getAllPlaceholderOf(element: ReactTestInstance) {
  const arr: string[] = [];
  processGetAllPlaceholder(element, arr);
  return arr;
}

function getAllValueOf(element: ReactTestInstance) {
  const arr: (string | boolean | number)[] = [];
  processGetAllValue(element, arr);
  return arr;
}

function getAllTypeOf(element: ReactTestInstance) {
  const arr: string[] = [];
  const json: ReactTestRendererJSON = screen.toJSON(element);
  processGetAllTypeOf(json, arr);
  return arr;
}

export {getAllTextOf, getAllPlaceholderOf, getAllValueOf, getAllTypeOf};
