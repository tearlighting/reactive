type TComputedProps<T> = IComputedGetter<T> | IComputedObject<T>

type IComputedGetter<T extends ()=>any> = T

interface IComputedObject<T extends ()=>any>{
	get:T,
	set:(newValue: any)=>void
}

interface IComputedType<T extends ()=>any>{
     value:ReturnType<T>
}  




export {
	IComputedGetter,
	IComputedObject,
	TComputedProps,
	IComputedType
}