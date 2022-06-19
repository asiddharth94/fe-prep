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
  thisArg.callerFunc = this;
  thisArg.callerFunc(...args);
};

// obj2.printMyName.myCall(obj, "KA");

Function.prototype.myApply = function (thisArg, args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("Second argument is not an array");
  }

  thisArg.callerFunc = this;
  thisArg.callerFunc(...args);
};

// obj2.printMyName.myApply(obj, ["KA"]);

Function.prototype.myBind = function (thisArg, ...args) {
  var callerFunc = this;
  return function (...innerArgs) {
    callerFunc.apply(thisArg, [...args, ...innerArgs]);
  };
};

const copied = obj2.printMyName.myBind(obj, "KA");
copied("Bengaluru");
