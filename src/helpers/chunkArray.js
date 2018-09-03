/**
 * 
 * @param {*} array 
 * @param {*} sizeOfTheChunkedArray 
 */
export function chunkArray(array, sizeOfTheChunkedArray) {
  const chunked = [];

  for (let element of array) {
    const last = chunked[chunked.length - 1];

    if(!last || last.length === sizeOfTheChunkedArray) {
      chunked.push([element])
    } else {
      last.push(element);
    }
  }
  return chunked;
}