import { TTarget2PropMap } from "reactive/types/effect"
import { Reactive } from "../../types"

/**
 * 用于存储原始对象和代理之间的映射关系
 * 拦截时候用
 */
export const proxyMap = new WeakMap<
  Record<string, any>,
  Reactive<Record<string, any>>
>()

/**
 * 需要代理返回原始对象
 */
export const RAW = Symbol.for("raw")

/**
 * 对象map到prop
 */
export const targetMap: TTarget2PropMap = new WeakMap()

/**
 * 触发器类型
 */
export enum ETriggerType {
  set = "set",
  add = "add",
  delete = "delete",
}
/**
 * 收集依赖类型
 */
export enum ETrackType {
  get = "get",
  has = "has",
  interate = "interate",
}
/**
 * 当使用for in 循环的时候,ownKeys的代理的key是null,使用默认key
 */
export const INTERATE_KEY = Symbol("interate")

/**
 * 触发器触发哪些收集器函数
 */
export const Trigger2Track = {
  [ETriggerType.set]: [ETrackType.get],
  [ETriggerType.add]: [ETrackType.has, ETrackType.get, ETrackType.interate],
  [ETriggerType.delete]: [ETrackType.has, ETrackType.get, ETrackType.interate],
}
