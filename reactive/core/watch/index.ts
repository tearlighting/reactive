import { Reactive } from "#/types"
import { IWatchOptions, TWatch, TWatchCallBack } from "#/types/watch"
import effect, { cleanup } from "../effect/effect"

export function watch<T, R>(target: TWatch<T>, cb: TWatchCallBack<T>, options?: IWatchOptions) {
  const targetArr = watchParamHandler(target)
  let oldValue

  const job = () => {
    const newValue = effectFunc()
    if (Array.isArray(target)) {
      cb(newValue as any, oldValue)
    } else {
      cb(newValue[0] as any, oldValue)
    }
    oldValue = newValue
    if (options?.once) {
      cleanup(effectFunc)
    }
  }
  const effectFunc = effect(
    () => {
      return targetArr.map((i) => i())
    },
    {
      lazy: true,
      callback: job,
    }
  )

  if (options?.immediate) {
    job()
  } else {
    effectFunc()
  }
  return () => cleanup(effectFunc)
}

/**
 *参数归一化
 * @param target
 */
function watchParamHandler<T>(target: TWatch<T>) {
  let targetArr: Array<() => T> = []
  if (Array.isArray(target)) {
    for (let i of target) {
      if (i instanceof Function) {
        targetArr.push(i)
      } else {
        targetArr.push(() => traverse(i) as any)
      }
    }
  } else {
    if (target instanceof Function) {
      targetArr.push(target)
    } else {
      targetArr.push(() => traverse(target) as any)
    }
  }
  return targetArr
}

/**
 * 递归收集依赖
 * @param target
 * @param seen
 * @returns
 */
function traverse<T>(target: Reactive<T>, seen = new Set<Object>()) {
  if (!target || typeof target !== "object" || seen.has(target)) {
    return
  }
  seen.add(target)
  for (let i in target) {
    traverse(target[i], seen)
  }
  return target
}

const a = [1, 2, 3]
