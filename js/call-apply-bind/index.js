const obj = {
  fName: "a",
  lName: "b",
};

const obj2 = {
  fName: "A",
  lName: "B",
  printMyName: function (state, city) {
    console.log(this.fName, this.lName, state, city);
  },
};

Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  const symbol = Symbol();

  thisArg[symbol] = this;
  const returnValue = thisArg[symbol](...args);

  delete thisArg[symbol];
  return returnValue;
};

// obj2.printMyName.myCall(obj, "KA", "Bang");

Function.prototype.myApply = function (thisArg, args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("Second argument is not an array");
  }

  return this.myCall(thisArg, ...args);

  //   const symbol = Symbol();

  //   thisArg[symbol] = this;
  //   const returnValue = thisArg[symbol](...args);

  //   delete thisArg[symbol];
  //   return returnValue;
};

obj2.printMyName.myApply(obj, ["KA", "Bang"]);

Function.prototype.myBind = function (thisArg, ...args) {
  var callerFunc = this;
  return function (...innerArgs) {
    callerFunc.apply(thisArg, [...args, ...innerArgs]);
  };
};

// const copied = obj2.printMyName.myBind(obj, "KA");
// copied("Bengaluru");
