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
} from '../utils';

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

function findAllChildren(
  element: ReactTestInstance,
  arr: (string | ReactTestInstance)[],
) {
  let current: (string | ReactTestInstance)[] = element.children;

  for (const e of current) {
    if (typeof e === 'string' || typeof e.type === 'string') {
      arr.push(e);
    }
    if (typeof e !== 'string') {
      findAllChildren(e, arr);
    }
  }
}

function getAllChildrenOf(
  element: ReactTestInstance,
): (string | ReactTestInstance)[] | null {
  if (element === null) {
    return null;
  }
  let child: ReactTestInstance[] = [];
  findAllChildren(element, child);

  return child;
}

function findAllParent(element: ReactTestInstance, arr: ReactTestInstance[]) {
  let current = element.parent;
  while (current) {
    if (typeof current.type === 'string') {
      arr.push(current);
    }
    current = current.parent;
  }
}

function getAllParentOf(
  element: ReactTestInstance | null,
): ReactTestInstance[] | null {
  if (element === null) {
    return null;
  }

  let parent: ReactTestInstance[] = [];
  findAllParent(element, parent);

  return parent;
}

export {
  getAllTextOf,
  getAllPlaceholderOf,
  getAllValueOf,
  getAllTypeOf,
  getAllChildrenOf,
  getAllParentOf,
};
