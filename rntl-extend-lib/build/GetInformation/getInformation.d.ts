import { type ReactTestInstance } from "react-test-renderer";
declare function getStyleOf(element: ReactTestInstance): object;
declare function getValueOf(element: ReactTestInstance): any;
declare function getTypeOf(element: ReactTestInstance): string;
declare function getPropsOf(element: ReactTestInstance, nameOfProps?: string): any;
declare function getParentOf(element: ReactTestInstance | null): ReactTestInstance | null;
declare function getChildrenOf(element: ReactTestInstance | null): (string | ReactTestInstance)[] | null;
declare function getEnabledInfo(element: ReactTestInstance): boolean;
export { getStyleOf, getValueOf, getTypeOf, getPropsOf, getParentOf, getChildrenOf, getEnabledInfo, };
