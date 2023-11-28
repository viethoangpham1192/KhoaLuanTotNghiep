import type { ReactTestInstance } from "react-test-renderer";
declare function getAllTextOf(element: ReactTestInstance): string[];
declare function getAllPlaceholderOf(element: ReactTestInstance): string[];
declare function getAllValueOf(element: ReactTestInstance): (string | number | boolean)[];
declare function getAllTypeOf(element: ReactTestInstance): string[];
declare function getAllChildrenOf(element: ReactTestInstance): (string | ReactTestInstance)[] | null;
declare function getAllParentOf(element: ReactTestInstance | null): ReactTestInstance[] | null;
export { getAllTextOf, getAllPlaceholderOf, getAllValueOf, getAllTypeOf, getAllChildrenOf, getAllParentOf, };
