import effect from "./effect/effect"
import { reactive } from "./reactive"
import { proxyMap, RAW, targetMap } from "./records"
import { computed } from "./computed"
import { watch } from "./watch"

export { reactive }

let state = reactive({
  a: 1,
  b: 2,
})

// const test = computed(() => {
//   return state.a + state.b
// })

// watch([test, state], (n, o) => {
//   console.log("watch", n, o)
//   //   console.log(n[1].a)
// })

effect(
  () => {
    state.a
    state.b
    console.log("收集依赖")
  },
  {
    callback() {
      console.log("变化了")
    },
  }
)
state.a = 2
state.b = 1
