import { ActiveEffect, IEffectOptions, TEffectReturnType } from "#/types/effect"
import { getTrackMap } from "../track/getTrackFuncSet"

/**
 * 当前正在执行的函数环境
 */
let activeEffect: ActiveEffect = null
/**
 * 模拟函数栈,解决effect嵌套时,内层直接把activeEffect=null
 */
let effectStack: ActiveEffect[] = []

/**
 * 将函数和数据关联
 */
const effect = <T extends IEffectOptions, R extends () => any>(func: R, { lazy, callback }: IEffectOptions = {}): TEffectReturnType<T, R> => {
  const environment: ActiveEffect<R> = () => {
    try {
      activeEffect = environment
      effectStack.push(activeEffect)
      cleanup(environment)
      return func() as ReturnType<R>
    } finally {
      effectStack.pop()
      activeEffect = effectStack.slice(-1)[0]
    }
    // console.log(activeEffect,'activeEffect')
  }
  environment.depends = []
  environment.options = { callback }

  if (lazy) {
    return environment as any
  } else {
    environment()
  }
}

/**
 * 每次执行前,清空之前收集的依赖
 */
export function cleanup(environment: ActiveEffect) {
  if (environment.depends.length) {
    environment.depends.forEach(({ target, key }) => {
      const trackMap = getTrackMap({ target, key })
      trackMap.clear()
      // console.log("environment depends", trackMap);
    })
    //   console.log("environment",environment.depends);

    environment.depends = []
  }
}

export { activeEffect }
export default effect
