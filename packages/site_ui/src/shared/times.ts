export const times = (n: number, callback: (index: number) => unknown) => {
  const arr = []
  for (let i = 0; i < n; i++) arr.push(callback(i));
  return arr
}