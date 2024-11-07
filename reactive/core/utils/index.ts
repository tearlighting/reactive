/**
 * 判断对象是否发生了改变
 * @param oldValue
 * @param newValue
 * @returns
 */
export function isChanged<T>(oldValue: T, newValue: T) {
  return !Object.is(oldValue, newValue)
}

export function isObject<T extends Record<string, any>>(target: T): target is T {
  return target instanceof Object && typeof target === "object"
}
