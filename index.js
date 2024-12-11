// No.3 Unlock the phone

const input = [
  [0, 1, 3],
  [0, 0, 2],
  [0, 0, 0],
];

function unlockThePhone(input) {
  console.time("unlockThePhone runtime");
  // Change the input to a string with len 9
  let startStr = "";

  // Load the input to the string
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      startStr += input[i][j];
    }
  }

  // We want to know if we can reach "000000000" from this starting string
  // For every index in startStr, compute the affected rows and columns when user click a number in that index

  const map = {
    0: "111100100",
    1: "111010010",
    2: "111001001",
    3: "100111100",
    4: "010111010",
    5: "001111001",
    6: "100100111",
    7: "010010111",
    8: "001001111",
  };

  // Helper function to compute the result string whenever user click a button
  function addString(str1, str2) {
    let res = "";
    for (let i = 0; i < str1.length; i++) {
      res += parseInt(str1[i]) === 3 ? "0" : String(parseInt(str1[i]) + parseInt(str2[i]));
    }
    return res;
  }

  // Create a set for visited string so that we don't recalculate the same string
  const visited = new Set();
  visited.add(startStr);

  // Initialize queue with start string and how many times a button is pressed
  const q = [[startStr, 0]];

  if (startStr === "000000000") {
    console.timeEnd("unlockThePhone runtime");
    return 0;
  }

  // Do BFS
  while (q.length) {
    console.log("set size", visited.size);
    const [inputStr, currCount] = q.shift();

    // Explore all possible buttons
    for (let i = 0; i < 9; i++) {
      const stringAfterButtonClicked = addString(inputStr, map[i]);
      if (stringAfterButtonClicked === "000000000") {
        console.timeEnd("unlockThePhone runtime");
        return currCount + 1;
      }
      if (!visited.has(stringAfterButtonClicked)) {
        visited.add(stringAfterButtonClicked);
        q.push([stringAfterButtonClicked, currCount + 1]);
      }
    }
  }
  console.timeEnd("unlockThePhone runtime");
  return -1;
}

console.log(unlockThePhone(input))
//var PTest = function () {
//  return new Promise(function (resolve, reject) {
//    setTimeout(function () {
//      reject();
//    }, 500);
//    // Lines of Code
//    resolve(unlockThePhone(input));
//  });
//};
//var myfunc = PTest();
//myfunc
//  .then(function (res) {
//    console.log("Resolved", res);
//  })
//  .catch(function () {
//    console.log("Runtime limit exceeded");
//  });
