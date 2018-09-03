export function getRandom(items) {
  return items[~~(items.length * Math.random())];
}