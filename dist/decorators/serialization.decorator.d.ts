export declare function getSerializeType(target: any): any;
export declare function setSerializeType(target: any, serializeType: any): void;
declare const Serialize: (roles: any) => (proto: any, propName: any, descriptor: any) => void;
export default Serialize;
