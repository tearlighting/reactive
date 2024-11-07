import { Trigger2Track } from '#/core/records'
import { ITriggerProps } from "../../../types/effect"
import { activeEffect } from '../effect'
import { trackType2FunSet } from "../track"
import {getPropMap, getTrackMap} from '../track/getTrackFuncSet'

/**
 *
 * 触发器
 */
const trigger = <T extends Record<string, any>>({ target, type, key }: ITriggerProps<T>) => {
//   console.log("触发了", target, "key 为", key, type, "方法")
//   trackType2FunSet.get(type)
     //收集的所有依赖
     const trackTypeMap = getTrackMap({target,key})
	 //此Trigger类型要执行的依赖类型
	 const trackTypes = Trigger2Track[type] || []
     const trackTypeCopy = new Map(trackTypeMap)
	  //你这边取取来执行
	  //然后track往里面加
	  //无限循环了
	 for(let [trackType,value] of trackTypeCopy){
		 //要执行的收集类型
		if(trackTypes.includes(trackType)){
			console.log('trigger emit',target ,key,type,value);
            new Set(value).forEach(effect=>{
				// console.log(activeEffect,effect);
				
				if(activeEffect===effect){
					return
				}
				if(effect.options?.callback){	
					effect.options.callback(effect)
				}else{
					effect()
				}

			}
		   )

		}
	 }

	 cleanupEmptyPropMap(target)



}
/**
 * 当把environment里面的依赖清完了,顺便把propMap给干掉
 */
function cleanupEmptyPropMap(target:Record<string,any>){
   const propMap = getPropMap({target})
   for(let [key,value] of propMap){
	if(!value.size){
       propMap.delete(key)
	}  
   }

}
export default trigger
