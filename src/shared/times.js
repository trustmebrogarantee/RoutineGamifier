export const times = (n, callback) => {
  const arr = []
  for (let i = 0; i < n; i++) arr.push(callback(i));
  return arr
}