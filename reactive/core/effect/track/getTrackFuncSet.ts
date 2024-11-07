import { ITrackProps } from '#/types/effect';
import { targetMap } from '#/core/records';

export default function <T>({target,key,type}:ITrackProps<T>){
    
    const trackTypeMap = getTrackMap({target,key})

	!trackTypeMap.has(type) && trackTypeMap.set(type,new Set())

	const funcSet = trackTypeMap.get(type)

	return funcSet
}

/**
 * 记录了此target,此key上收集的一些依赖
 * @param param0 
 * @returns 
 */
function getTrackMap<T>({target,key}:Pick<ITrackProps<T>,"key"|'target'>){
	const propMap = getPropMap({target})
	!propMap.has(key as string) && propMap.set(key as string,new Map())
	const trackTypeMap = propMap.get(key as string)
	return trackTypeMap
}

function getPropMap<T>({target}:Pick<ITrackProps<T>,'target'>){
	!targetMap.has(target) && targetMap.set(target,new Map()) 
	const propMap = targetMap.get(target)
	return propMap
}

export {getTrackMap,getPropMap}