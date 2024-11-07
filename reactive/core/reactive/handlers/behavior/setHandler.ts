import { ETriggerType } from '#/core/records'
import trigger from "../../../effect/trigger"
import { isChanged } from "../../../utils"

/**
 * 设置值,分为两个情况,新增或者修改
 * 修改后判断是否变化 变化才更新
 *
 * 数组的长度隐式变化时，手动派发更新
 * @param target
 * @param key
 * @param newValue
 * @param receiver
 * @returns
 */
const setHandler: ProxyHandler<Object>["set"] = (target, key, newValue, receiver) => {
  const type = target.hasOwnProperty(key) ? ETriggerType.set : ETriggerType.add

  const oldValue = target[key]
  const oldLength = Array.isArray(target) ? target.length : null

  const res = Reflect.set(target, key, newValue, receiver)

  if (isChanged(oldValue, newValue)) {
    trigger({
      target,
      type,
      key: key as any,
    })
    //数组的长度变化处理
    if (Array.isArray(target)) {
      const newLength = target.length
      //如果隐式修改了length手动触发length更新
      if (key !== "length" && oldLength !== newLength) {
        trigger({
          target,
          type: ETriggerType.set,
          key: "length",
        })
      }
      //如果显示修改length,变大是正常的，变小的话，手动触发删除
      else if (newLength < (oldLength as number)) {
        for (let i = newLength; i < (oldLength as number); i++) {
          trigger({
            target,
            type: ETriggerType.delete,
            key: i,
          })
        }
      }
    }
  }
  return res
}

export default setHandler
