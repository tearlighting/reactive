import { reactive } from "../.."
import { track } from "../../../effect"
import { ETrackType } from "#/core/records"
import { RAW } from "../../../records"
import { arrayInstrumentactions, EArrayErrorType, EArrayErrorType2 } from "../specialHandler/arrayHandler"

/**
 * 读取属性收集依赖
 * @param target
 * @param key
 * @param receiver
 * @returns
 */
const getHandler: ProxyHandler<any>["get"] = (target, key, receiver) => {
  //获取原始对象,不会存到proxyMap
  if (key === RAW) {
    return target
  }
  //数组可能存在一些问题,因为默认情况下对象成员全部通过get成了代理
  //   console.log(key, target)
  if (Array.isArray(target) && [...Object.values(EArrayErrorType), ...Object.values(EArrayErrorType2)].includes(key as any)) {
    return arrayInstrumentactions[key]
  }

  const res = Reflect.get(target, key, receiver)

  //拦截收集依赖
  track({
    target,
    key,
    type: ETrackType.get,
  })
  //   console.log("拦截" + (key as any))
  if (res instanceof Object && typeof res === "object") {
    return reactive(res)
  }
  return res
}

export default getHandler
