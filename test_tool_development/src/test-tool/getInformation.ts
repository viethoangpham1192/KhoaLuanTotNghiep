import {type ReactTestInstance} from 'react-test-renderer';

import {extractObjects} from './utils';

function getStyleOf(element: ReactTestInstance) {
  const style: object = element.props.style;
  if (Array.isArray(style)) {
    const mergedObject: object = {};
    const arrayProcessing = extractObjects(style);
    for (const obj of arrayProcessing) {
      Object.assign(mergedObject, obj);
    }
    return mergedObject;
  } else {
    return style;
  }
}

function getValueOf(element: ReactTestInstance) {
  return element.props.value;
}

function getTypeOf(element: ReactTestInstance): string {
  // return element.type.displayName || element.type.name || element.type;
  return element.type.toString();
}

function getPropsOf(element: ReactTestInstance, nameOfProps?: string) {
  if (nameOfProps === undefined) {
    return element.props;
  } else {
    return element.props[nameOfProps];
  }
}

function getParentOf(
  element: ReactTestInstance | null,
): ReactTestInstance | null {
  if (element === null) {
    return null;
  }

  let current = element.parent;

  while (current) {
    if (typeof current.type === 'string') {
      return current;
    }

    current = current.parent;
  }

  return null;
}

function findChildren(
  element: ReactTestInstance,
  arr: (string | ReactTestInstance)[],
) {
  let current: (string | ReactTestInstance)[] = element.children;

  for (const e of current) {
    if (typeof e === 'string' || typeof e.type === 'string') {
      arr.push(e);
    } else {
      findChildren(e, arr);
    }
  }
}

function getChildrenOf(
  element: ReactTestInstance | null,
): (string | ReactTestInstance)[] | null {
  if (element === null) {
    return null;
  }
  let child: ReactTestInstance[] = [];
  findChildren(element, child);

  return child;
}

export {
  getStyleOf,
  getValueOf,
  getTypeOf,
  getPropsOf,
  getParentOf,
  getChildrenOf,
};
