let input = [2, 4, 6, 8, 10];

let fn = (i) => {
  return i * 2;
};

let map = (arr, fn) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i]));
  }
  return newArr;
};

console.log(map(input, fn));
