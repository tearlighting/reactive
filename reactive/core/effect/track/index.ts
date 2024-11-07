import { targetMap } from '#/core/records'
import { ITrackProps, TETrackType2FunSet } from "../../../types/effect"
import { activeEffect } from "../effect"
import getTrackFuncSet from './getTrackFuncSet'
import { useShouldTrackHook } from "./useShouldTrackHook"

const { shouldTrack, pauseTrack, enableTrack } = useShouldTrackHook()

export const trackType2FunSet: TETrackType2FunSet = new Map()

/**

/**
 * 收集器
 * 收集依赖
 */
const track = <T extends Record<string, any>>({ target, type, key }: ITrackProps<T>) => {
  if (shouldTrack) {
    // console.log(activeEffect)
    // let funcSet = trackType2FunSet.get(type)
    // if (!funcSet) {
    //   funcSet = new Set()
    //   trackType2FunSet.set(type, funcSet)
    // }
    // funcSet.add(activeEffect)
    // // console.log("收集依赖", target, key, `执行了${type}操作`)
    // console.log(trackType2FunSet)
	const funcSet = getTrackFuncSet({target,type,key})
	if(activeEffect){
		console.log('track excute',target,key,type);
		activeEffect.depends.push({target,key:key as any})
		funcSet.add(activeEffect)

	}

	

  }
}




export default track

export { pauseTrack, enableTrack }
