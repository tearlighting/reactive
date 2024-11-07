import { RAW } from "../../../records"
import { enableTrack, pauseTrack } from "../../../effect/track"

/**
 * 这些操作会用代理对象和原始对象比较，可能出现问题
 */
export enum EArrayErrorType {
  includes = "includes",
  indexOf = "indexOf",
  lastIndexOf = "lastIndexOf",
}

const arrayInstrumentactions = {} as Record<EArrayErrorType | EArrayErrorType2, (...arg: any) => any>

Object.values(EArrayErrorType).forEach((key) => {
  arrayInstrumentactions[key] = function (...arg: any) {
    //先在代理对象上找
    //@ts-ignore
    let res = Array.prototype[key].call(this, ...arg)
    //找不到再去原始对象上找
    if ((typeof res === "boolean" && res === false) || (typeof res === "number" && res < 0)) {
      //@ts-ignore
      res = Array.prototype[key].call(this[RAW], ...arg)
    }
    return res
  }
})

/**
 * 这些对象会额外调用一次get length,会产生新的依赖收集,需要去掉
 */
export enum EArrayErrorType2 {
  pop = "pop",
  push = "push",
  shift = "shift",
  unshift = "unshift",
}

Object.values(EArrayErrorType2).forEach((key) => {
  arrayInstrumentactions[key] = function (...arg) {
    pauseTrack()
	//@ts-ignore
    let res = Array.prototype[key].call(this, ...arg)
    enableTrack()
    return res
  }
})

export { arrayInstrumentactions }
