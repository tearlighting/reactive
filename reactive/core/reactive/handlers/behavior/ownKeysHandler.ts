import { track } from "../../../effect"
import { ETrackType, INTERATE_KEY } from "#/core/records"

const ownKeysHandler: ProxyHandler<any>["ownKeys"] = (target) => {
  const res = Reflect.ownKeys(target)
  track({
    target,
    key: INTERATE_KEY,
    type: ETrackType.interate,
  })
  return res
}

export default ownKeysHandler
