import { Reactive } from "../../types"
import { proxyMap } from "../records"
import { isObject } from "../utils"
import handlers from "./handlers"

/**
 * 拦截读写操作,收集依赖,派发更新
 * 读：get interate
 * 写：set add delete
 * @param target
 * @returns
 */
export function reactive<T extends Record<string, any>>(target: T): Reactive<T> {
  if (!isObject(target)) {
    throw new Error("请传递一个对象")
  }
  if (proxyMap.has(target)) {
    return proxyMap.get(target) as Reactive<T>
  }
  const targetProxy = new Proxy(target, handlers)
  proxyMap.set(target, targetProxy)
  return targetProxy
}
