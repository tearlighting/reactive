function useShouldTrackHook() {
  let shouldTrack = true

  function pauseTrack() {
    shouldTrack = false
  }

  function enableTrack() {
    shouldTrack = true
  }
  return {
    shouldTrack,
    pauseTrack,
    enableTrack,
  }
}

export { useShouldTrackHook }
