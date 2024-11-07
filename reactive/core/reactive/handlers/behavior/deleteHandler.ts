import { ETriggerType } from '#/core/records'
import trigger from "../../../effect/trigger"

/**
 * 删除值
 * 只有删除在对象上面的值才能派发更新
 * @param target
 * @param key
 * @returns
 */
const deleteHandler: ProxyHandler<any>["deleteProperty"] = (target, key) => {
  const hasKey = target.hasOwnProperty(key)
  const res = Reflect.deleteProperty(target, key)

  //只有当有这的属性,且删除成功才触发
  hasKey &&
    res &&
    trigger({
      target,
      key,
      type: ETriggerType.delete,
    })
  return res
}

export default deleteHandler
