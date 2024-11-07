/**
 * 收集依赖类型
 */


import { ETriggerType ,ETrackType, INTERATE_KEY } from "#/core/records"

interface ITrackProps<T extends Record<string, any>> {
  /**
   * 原始对象
   */
  target: T
  /**
   * 操作类型
   */
  type: ETrackType
  /**
   * 针对哪个属性
   */
  key: keyof T | typeof INTERATE_KEY
}

interface ITriggerProps<T extends Record<string, any>> {
  /**
   * 原始对象
   */
  target: T
  /**
   * 操作类型
   */
  type: ETriggerType
  /**
   * 针对哪个属性
   */
  key: keyof T
}

/**
 * 将函数和数据关联
 * 会先执行一遍,将里面的收集器类型包含的key存到map里面
 */
// interface Effect<T extends IEffectOptions> {
// //   (func: (...arg: any) => void): void
//   (func: (...arg: any) => void,options?:T):TEffectReturnType<T>
// }

type TEffectReturnType<T extends IEffectOptions,R extends (...arg:any) => any> = `${T['lazy']}` extends `true`?ActiveEffect<R>:void 
interface IEffectOptions{
	/**
	 * 不立即执行,连同环境一起给你
	 */
    lazy?: true,
	callback?: (func:ActiveEffect)=>any
}

interface ActiveEffect<T extends (...arg:any) => any = any>{
	(fun?: T): ReturnType<T>
	depends: Array<{
		 target:Record<string,any>,
		 key: string
	}>
	options:IEffectOptions
}

/**
 * 对象记录哪些属性要更新
 */
type TTarget2PropMap = WeakMap<Record<string, any>, TProp2TrackTypeMap>
/**
 * 属性记录依赖收集了哪些行为 get has interate
 */
type TProp2TrackTypeMap = Map<string, TETrackType2FunSet>

/**
 * 依赖收集行为对应的具体方法
 */
type TETrackType2FunSet = Map<ETrackType, Set<ActiveEffect>>
export type { ITrackProps, ITriggerProps, TETrackType2FunSet, TProp2TrackTypeMap, TTarget2PropMap,ActiveEffect,IEffectOptions,TEffectReturnType}


