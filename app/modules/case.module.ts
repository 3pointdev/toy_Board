import { camelize, snakify } from "camelsnake";

export function camelCaseFromArray(array: []): any[] {
  return array.map((item, index: number) => {
    if (Array.isArray(item)) {
      return camelCaseFromArray(item);
    }
    return camelize(item);
  });
}

export function snakeCaseFromArray(array: []): any[] {
  return array.map((item, index: number) => {
    if (Array.isArray(item)) {
      return snakeCaseFromArray(item);
    }
    return snakify(item);
  });
}

export function camelCase(object: object): any {
  let data = {};
  let arrayData = {};
  for (const prop in object) {
    if (Array.isArray(object[prop])) {
      arrayData[camelizeString(prop)] = camelCaseFromArray(object[prop]);
    } else {
      data[prop] = object[prop];
    }
  }
  data = camelize(data);
  return Object.assign(data, arrayData);
}

export function snakeCase(object: object): any {
  let data = {};
  let arrayData = {};
  for (const prop in object) {
    if (Array.isArray(object[prop])) {
      arrayData[snakifyString(prop)] = snakeCaseFromArray(object[prop]);
    } else {
      data[prop] = object[prop];
    }
  }
  data = snakify(object);
  return Object.assign(data, arrayData);
}

export function camelizeString(str) {
  return str.replace(/_(\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}

export function snakifyString(str) {
  return str
    .replace(/[A-Z]/g, function (match) {
      return "_" + match[0];
    })
    .toLowerCase();
}
