import { ETrackType } from '#/core/records'
import { track } from "../../../effect"


/**
 * 处理 in 操作(上prototype)
 */
const hasHandler: ProxyHandler<any>["has"] = (target, key) => {
  const res = Reflect.has(target, key)
  track({
    target,
    key,
    type: ETrackType.has,
  })
  return res
}

export default hasHandler
