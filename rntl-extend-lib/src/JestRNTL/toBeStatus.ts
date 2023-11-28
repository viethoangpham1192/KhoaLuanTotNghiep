import type { ReactTestInstance } from "react-test-renderer";
import { getStyleOf, getTypeOf } from "../GetInformation";

function toMatchStyle(
  this: jest.MatcherContext,
  received: ReactTestInstance,
  threshold: object
) {
  let pass: boolean = false;
  const styleOfReceived = getStyleOf(received);

  pass = this.equals(styleOfReceived, threshold);

  if (pass) {
    return {
      message: () => `Expected ${received} have style ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} have not style ${threshold}`,
      pass: false,
    };
  }
}

function toMatchType(received: ReactTestInstance, threshold: string) {
  let pass: boolean = false;
  const typeOfReceived = getTypeOf(received);
  pass = typeOfReceived === threshold;

  if (pass) {
    return {
      message: () => `Expected ${received} to be of type ${threshold}`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not of type ${threshold}`,
      pass: false,
    };
  }
}

function checkDisable(received: ReactTestInstance): boolean {
  let pass: boolean = false;

  if (
    getTypeOf(received) === "TextInput" &&
    received?.props?.editable === false
  ) {
    pass = true;
  } else {
    pass =
      !!received?.props?.disabled ||
      !!received?.props?.accessibilityState?.disabled ||
      !!received?.props?.accessibilityStates?.includes("disabled");
  }
  return pass;
}

function toBeDisable(received: ReactTestInstance) {
  let pass: boolean = checkDisable(received);

  if (pass) {
    return {
      message: () => `Expected ${received} to be disable`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not disable `,
      pass: false,
    };
  }
}

function toBeEnable(received: ReactTestInstance) {
  let pass: boolean = !checkDisable(received);

  if (pass) {
    return {
      message: () => `Expected ${received} to be enable`,
      pass: true,
    };
  } else {
    return {
      message: () => `Expected ${received} not enable `,
      pass: false,
    };
  }
}

export { toMatchStyle, toMatchType, toBeDisable, toBeEnable };
