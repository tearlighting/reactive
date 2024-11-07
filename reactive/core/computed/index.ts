import { IComputedGetter, IComputedType ,IComputedObject, TComputedProps} from '#/types/computed';
import { track, trigger } from '../effect';
import effect from '../effect/effect';
import { ETrackType, ETriggerType } from '../records';

function computed<T extends ()=>any>(getter:IComputedGetter<T>):IComputedType<T>
function computed<T extends ()=>any>(options:IComputedObject<T>):IComputedType<T>
function computed<T extends ()=>any>(param: TComputedProps<T>){
	 let getter:IComputedGetter<T>
	 let setter:IComputedObject<T>['set']
    if(isComputedObject(param)){
      const {get,set} = param
	  getter = get,
	  setter = set
	}else{
		getter = param
	}
    let res = null as IComputedType<T>
	let dirty = true
    const effectFunc = effect(getter,{
		 lazy: true,
		 callback(e){
			// console.log(e === effectFunc); true
			dirty = true
			trigger({
				target:obj,
				type:ETriggerType.set,
				key:'value'
			})
		 }
	})
	const obj = {
		get value(){
		    track({
               target:obj,
			   type:ETrackType.get,
			   key:'value'
			})
			if(dirty){
				res = effectFunc()
				dirty = false
			}
			return res
		},
		set value(newValue){
            setter && setter(newValue)
		}
	}
	return obj

}

function isComputedObject<T extends ()=>any>(target:TComputedProps<T>):target is IComputedObject<T>{
    if(typeof target === 'function'){
		return false
	}
	return true
}


export {
	computed
}