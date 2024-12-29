export const playSound = (soundName: string) => {
  const audio = new Audio(`/RoutineGamifier/sfx/${soundName}`)
  audio.addEventListener("canplaythrough", (event) => {
    audio.play()
  })
}