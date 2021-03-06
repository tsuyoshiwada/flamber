// flow-typed signature: a24af55b60ac7e866705bbc2a9b1a9b8
// flow-typed version: 94e9f7e0a4/normalizr_v2.x.x/flow_>=v0.23.x

declare class Normalizr$Schema {
  define(nestedSchema: Object): void;
}
type Normalizr$SchemaOrObject = Normalizr$Schema | Object;

declare module 'normalizr' {
  declare class Normalizr {
    normalize(obj: Object, schema: Normalizr$SchemaOrObject): Object;
    Schema(key: string, options?: Object): Normalizr$Schema;
    arrayOf(schema: Normalizr$SchemaOrObject, options?: Object): Normalizr$Schema;
    valuesOf(schema: Normalizr$SchemaOrObject, options?: Object): Normalizr$Schema;
  }
  declare var exports: Normalizr;
}
