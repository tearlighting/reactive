export type IWatchOptions = {
  immediate?: boolean
  once?: boolean
}

export type TWatch<T> = (() => T) | (() => T)[]

export type TWatchCallBack<T> = (newValue: T, oldValue: T) => void
