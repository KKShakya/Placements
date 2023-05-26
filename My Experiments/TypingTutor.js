var genWordlist = function (n, letters) {
  var results = [];
  if (n > 5) {
    return [];
  }
  var helper = function (cache) {
    for (var i = 0; i < letters.length; i++) {
      cache += letters[i];
      if (cache.length === n) {
        results.push(cache);
      } else {
        helper(cache);
      }
      cache = cache.slice(0, -1);
    }
  }
  helper("");
  return results;
};


//to shuffle and make a list of words as per required combination
function shuffleArray(array, comb = 6) {
  let newArr = [];
  if (array.length < 6) {
    return 0;
  }

  array.sort(() => Math.random() - 0.5);
  for (let i = 0; i < comb; i++) {
    newArr.push(array[i]);
  }
  return newArr;
}

///to make repition of same elements
function repeat(n = 4, arr) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(...arr)
  }

  return result;

}


let text = genWordlist(4, ['a', 's', 'd', 'f', 'j', 'k', 'l',])
// console.log(text)
const typeText = shuffleArray(text, 2);


console.log(repeat(5, typeText));
