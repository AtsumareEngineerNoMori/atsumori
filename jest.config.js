module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testURL: "http://localhost/",
//   testEnvironment: "node",
};

//package.jsonに記述していた部分丸々
//   "jest": {
//     "moduleFileExtensions": [
//       "js",
//       "ts",
//       "json",
//       "vue"
//     ],
//     "transform": {
//       "^.+\\.tsx?$": "ts-jest",
//       "^.+\\.vue$": "@vue/vue3-jest",
//       "^.+\\.jsx?$": "babel-jest"
//     },
//     "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//     "testURL": "http://localhost/"
//   }
