function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime_1 = createCommonjsModule(function (module) {
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

function nodeNeedBg(node) {
  return node.backgroundColor !== 'rgba(0, 0, 0, 0)' || ['img', 'svg'].includes(node.tagName.toLowerCase()) || node.backgroundImage !== 'none' || node.containTextNode || node.boxShadow !== 'none';
}
function nodeNeedBorder(node) {
  return node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth !== '0px0px0px0px';
} // 两个元素是否有重叠部分

function isIntersect(node1, node2) {
  const x1 = node1.x;
  const y1 = node1.y;
  const w1 = node1.width;
  const h1 = node1.height;
  const x2 = node2.x;
  const y2 = node2.y;
  const w2 = node2.width;
  const h2 = node2.height;
  if (x1 + w1 <= x2) return false;
  if (x1 >= x2 + w2) return false;
  if (y1 + h1 <= y2) return false;
  if (y1 >= y2 + h2) return false;
  return true;
} // 节点是否被覆盖

function isCovered(list, targetIndex) {
  const target = list[targetIndex];

  for (let i = targetIndex + 1; i < list.length; i++) {
    const node = list[i];
    if (!nodeNeedBg(node)) continue;

    if (node.x <= target.x && node.y <= target.y && node.x + node.width >= target.x + target.width && node.y + node.height >= target.y + target.height) {
      return true;
    }
  }

  return false;
}
/**
 * 重叠元素色差处理
 * 初始颜色级别都为0
 * 位于重叠下一层的元素，颜色级别+1
 * 
 * descList
 */

function getColorLevelList(descList, maxLevel) {
  // 初始级别都为0
  const colorLevelList = Array(descList.length).fill(0); // 按照是否相交

  for (let i = descList.length - 1; i > 0; i--) {
    const nodeI = descList[i];

    for (let j = i - 1; j >= 0; j--) {
      const nodeJ = descList[j];
      if (!nodeNeedBg(nodeJ)) continue;

      if (isIntersect(nodeI, nodeJ)) {
        const adjustLevel = Math.min(maxLevel, colorLevelList[i] + 1); // 最大level限制

        colorLevelList[j] = Math.max(adjustLevel, colorLevelList[j]);
      }
    }
  } // 按照父子关系
  // for (const index in descList) {
  //   const node = descList[index];
  //   const isLeaf = descList.every(item => item.parentId !== node.id);
  //   if (!isLeaf) continue;
  //   let parentIndex = descList.findIndex(item => item.id === node.parentId);
  //   let count = 1;
  //   while (parentIndex >= 0) {
  //     const parent = descList[parentIndex];
  //     if (!nodeNeedBg(parent)) {
  //       parentIndex = descList.findIndex(item => item.id === parent.parentId);
  //       continue;
  //     }
  //     const colorLevel = Math.min(maxLevel, count);
  //     colorLevelList[parentIndex] = Math.max(colorLevel, colorLevelList[parentIndex]);
  //     parentIndex = descList.findIndex(item => item.id === parent.parentId);
  //     count++;
  //   }
  // }


  return colorLevelList;
}

/**
 * 元素是否出现在视口
 * 只要有一部分在视口返回true
 */
function isPartInViewPort(element) {
  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left;

  if (top > viewHeight) return false;
  if (left > viewWidth) return false;
  if (bottom < 0) return false;
  if (right < 0) return false;
  return true;
}

var RefViewportRatio = 0.95;
/**
 * 响应式处理
 * @param list  骨架数据
 * @param refList 改变视口尺寸后的骨架数据
 */

function setResponsive(list, refList) {
  list.map(function (item) {
    var refItem = refList.find(function (i) {
      return i.id === item.id;
    });
    if (!refItem) return;

    if (Math.abs(item.width - refItem.width) >= 0.5) {
      // 标记出响应式节点
      item.responsive = true;
      /**
       * 计算响应式宽度
       * 两种形式
       * 1.完全缩放的： xx vw
       * 2.固定左右边距缩放的：calc(100vw - xx)
       */

      var ratio = item.width / window.innerWidth;

      var _refItemWidth = window.innerWidth * RefViewportRatio * ratio;

      if (Math.abs(_refItemWidth - refItem.width) <= 0.1) {
        // 完全缩放
        item.responsiveWidth = "".concat(ratio.toFixed(2), "vw");
      } else {
        // 固定左右边距缩放
        item.responsiveWidth = "calc(100vw - ".concat(window.innerWidth - item.width, "px)");
      }
    }
  });
}

/** 骨架元素描述 */

/**
 * 获取骨架节点描述扁平数据
 * @param root 根元素
 */
function getSkeletonDescList(root, root2) {
  var list = generateSkeletonDescList({
    node: root
  });
  var list2 = generateSkeletonDescList({
    node: root2
  });
  setResponsive(list, list2);
  list = clipSkeletonDescList(list);
  list = reduceSkeletonDescList(list);
  return list;
}
/**
 * 提取骨架描述
 */

function getSkeletonDesc(opt) {
  var _element$getAttribute, _parentDesc$moduleId, _moduleId;

  var node = opt.node,
      index = opt.index,
      parentDesc = opt.parentDesc;

  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {
    // 只处理元素节点和文本节点
    return null;
  }

  var element = node;
  /** 
   * 文本节点处理
   */

  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent.replace(/↵|\s/g, '')) {
      // 过滤无内容的文本节点
      return null;
    }

    parentDesc.containTextNode = true;
    return null;
  }

  if (element.getAttribute('skeletonx-ignore') !== null) return null; // skeletonx-ignore

  var style = getComputedStyle(element);
  /** 过滤不可见元素 */

  var ignore = false;
  if (style.display === 'none') ignore = true;else if (style.visibility === 'hidden') ignore = true;else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  var clientRect = element.getBoundingClientRect();
  var moduleId = undefined;
  var nodeSkltId = (_element$getAttribute = element.getAttribute('skeletonx-module-id')) !== null && _element$getAttribute !== void 0 ? _element$getAttribute : undefined;
  var parentModuleId = (_parentDesc$moduleId = parentDesc === null || parentDesc === void 0 ? void 0 : parentDesc.moduleId) !== null && _parentDesc$moduleId !== void 0 ? _parentDesc$moduleId : [];

  if (nodeSkltId || parentModuleId !== null && parentModuleId !== void 0 && parentModuleId.length) {
    moduleId = [].concat(_toConsumableArray(parentModuleId), [nodeSkltId]).filter(function (i) {
      return i;
    });
  }

  if (!((_moduleId = moduleId) !== null && _moduleId !== void 0 && _moduleId.length)) moduleId = undefined;
  return {
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? "".concat(parentDesc.id, "[").concat(index, "]") : '',
    moduleRoot: nodeSkltId ? true : undefined,
    moduleId: moduleId,
    tagName: element.tagName,
    // nodeType: node.nodeType,
    x: clientRect.left,
    y: clientRect.top,
    height: clientRect.height,
    width: clientRect.width,
    borderBottomWidth: style.borderBottomWidth,
    borderLeftWidth: style.borderLeftWidth,
    borderRightWidth: style.borderRightWidth,
    borderTopWidth: style.borderTopWidth,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    backgroundColor: style.backgroundColor,
    backgroundImage: style.backgroundImage,
    overflowX: style.overflowX,
    overflowY: style.overflowY,
    position: style.position,
    // @ts-ignore
    $node: node // for debug TODO delete 

  };
}
/**
 * 递归生成骨架元素扁平数据
 */

function generateSkeletonDescList(opt) {
  var node = opt.node,
      parentDesc = opt.parentDesc,
      _opt$index = opt.index,
      index = _opt$index === void 0 ? 0 : _opt$index,
      _opt$list = opt.list,
      list = _opt$list === void 0 ? [] : _opt$list;
  var skeletonDesc = getSkeletonDesc({
    node: node,
    index: index,
    parentDesc: parentDesc
  });
  if (!skeletonDesc) return;
  list.push(skeletonDesc);
  if (skeletonDesc.tagName.toLowerCase() === 'svg') return list;

  if (node.hasChildNodes()) {
    for (var i = 0; i < node.childNodes.length; i++) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skeletonDesc,
        index: i,
        list: list
      });
    }
  }

  return list;
}
/**
 * 裁剪骨架节点
 * 
 * 子元素不是absolute和fixed
 * 且子元素尺寸大于父元素
 * 且父元素overflow不为visible
 */

function clipSkeletonDescList(list) {
  var _iterator = _createForOfIteratorHelper(list),
      _step;

  try {
    var _loop = function _loop() {
      var node = _step.value;
      var childNodes = list.filter(function (item) {
        return item.parentId === node.id;
      });
      if (!(childNodes !== null && childNodes !== void 0 && childNodes.length)) return "continue";
      if (node.overflowX === 'visible' && node.overflowY === 'visible') return "continue"; // 裁剪所有子孙节点

      var nodesQueue = childNodes;

      var _loop2 = function _loop2() {
        var child = nodesQueue.shift();
        if (child.position === 'absolute' || child.position === 'fixed') return "continue";

        if (node.overflowX !== 'visible') {
          // 横向被裁剪
          if (child.x < node.x) child.x = node.x;
          if (child.x + child.width > node.x + node.width) child.width = node.width - (child.x - node.x);
        }

        if (node.overflowY !== 'visible') {
          // 纵向被裁剪
          //   child.height = node.height;
          if (child.y < node.y) child.y = node.y;
          if (child.y + child.height > node.y + node.height) child.height = node.height - (child.y - node.y);
        }

        var grandChildren = list.filter(function (item) {
          return item.parentId === child.id;
        });
        nodesQueue.push.apply(nodesQueue, _toConsumableArray(grandChildren));
      };

      while (nodesQueue.length > 0) {
        var _ret2 = _loop2();

        if (_ret2 === "continue") continue;
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  console.log('clip', list);
  return list;
}
/**
 * 精简骨架节点
 * 1. 无背景 & 无文本 & 无边框的节点过滤掉
 */

function reduceSkeletonDescList(list) {
  // {被删除的节点id: 被删除节点的parentId}
  var IdMap = {};
  var res = list.filter(function (node, index) {
    if (['img', 'svg'].includes(node.tagName.toLowerCase())) {
      return true;
    }

    if (node.moduleRoot) {
      return true;
    } // 无背景色


    var noBg = /rgba\((\d+,\s*){3}0\)/.test(node.backgroundColor) && node.backgroundImage === 'none'; // 无文本

    var noText = !node.containTextNode; // 无边框

    var noBorder = node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth === '0px0px0px0px'; // 无阴影

    var noShadow = node.boxShadow === 'none'; // 无尺寸

    var noSize = node.width * node.height <= 0; // 删掉节点

    if (noBg && noText && noBorder && noShadow || noSize || isCovered(list, index)
    /*被覆盖*/
    ) {
        // 保存id -> parentId
        IdMap[node.id] = node.parentId;
        return false;
      }

    return true;
  }).map(function (node) {
    var newParentId = IdMap[node.parentId];

    while (IdMap[newParentId] !== undefined) {
      newParentId = IdMap[newParentId];
    }

    if (newParentId !== undefined) node.parentId = newParentId; // 重新连接parentId

    return node;
  });
  console.log('reduce', res);
  return res;
}
function getModuleMap(descList) {
  var ModuleMap;

  for (var i in descList) {
    var desc = descList[i];
    var moduleId = desc.moduleId;

    if (moduleId !== null && moduleId !== void 0 && moduleId.length) {
      ModuleMap = ModuleMap || {};

      var _iterator2 = _createForOfIteratorHelper(moduleId),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var id = _step2.value;

          if (!ModuleMap[id]) {
            ModuleMap[id] = [Number(i), Number(i)];
          } else {
            ModuleMap[id][1] = Number(i);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
  return ModuleMap;
}
/**
 * 骨架描述转为骨架渲染描述
 */

function toRenderDescList(descList) {
  var res = []; // borderColor:  #8e9097

  var ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
  var colorLevelList = getColorLevelList(descList, ColorLevelMap.length - 1);
  console.log('colorLevelList', colorLevelList);

  for (var index in descList) {
    var _node$responsiveWidth;

    var node = descList[index];
    var renderDesc = {
      left: node.x,
      top: node.y,
      height: node.height,
      width: (_node$responsiveWidth = node.responsiveWidth) !== null && _node$responsiveWidth !== void 0 ? _node$responsiveWidth : node.width + 'px'
    };
    if (node.borderLeftWidth !== '0px') renderDesc.borderLeftWidth = Number(node.borderLeftWidth.replace('px', ''));
    if (node.borderRightWidth !== '0px') renderDesc.borderRightWidth = Number(node.borderRightWidth.replace('px', ''));
    if (node.borderTopWidth !== '0px') renderDesc.borderTopWidth = Number(node.borderTopWidth.replace('px', ''));
    if (node.borderBottomWidth !== '0px') renderDesc.borderBottomWidth = Number(node.borderBottomWidth.replace('px', ''));
    if (node.borderRadius !== '0px') renderDesc.borderRadius = Number(node.borderRadius.replace('px', ''));

    if (nodeNeedBorder(node)) {
      renderDesc.borderColor = 0;
    }

    if (nodeNeedBg(node)) {
      renderDesc.backgroundColor = colorLevelList[index];
    }

    res.push(renderDesc);
  }

  return res;
}
function getRenderData(root, root2) {
  var descList = getSkeletonDescList(root, root2);
  var renderList = toRenderDescList(descList);
  var moduleMap = getModuleMap(descList);
  console.log('render data', renderList);
  console.log('module map', moduleMap);
  return {
    data: renderList,
    moduleMap: moduleMap
  };
}
/**
 * 使用'|'分隔RenderDesc的属性值，固化属性的顺序
 * @return top|left|height|width|borderTopWidth|borderRightWidth|borderBottomWidth|borderLeftWidth|borderRadius|borderColor|backgroundColor|
 */

function renderDescToString(desc) {
  return [desc.top, desc.left, desc.height, desc.width, desc.borderTopWidth, desc.borderRightWidth, desc.borderBottomWidth, desc.borderLeftWidth, desc.borderRadius, desc.borderColor, desc.backgroundColor].join('|');
}
function parseStringToRenderDesc(str) {
  var values = str.split('|');
  return {
    top: values[0] || undefined,
    left: values[1] || undefined,
    height: values[2] || undefined,
    width: values[3] || undefined,
    borderTopWidth: values[4] || undefined,
    borderRightWidth: values[5] || undefined,
    borderBottomWidth: values[6] || undefined,
    borderLeftWidth: values[7] || undefined,
    borderRadius: values[8] || undefined,
    borderColor: values[9] || undefined,
    backgroundColor: values[10] || undefined
  };
}

/**
 * 骨架渲染描述转为骨架节点render props
 */
function transforRenderDescToRenderProps(desc) {
  var BorderColor = '#8e9097';
  var ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
  var props = {
    top: desc.top + 'px',
    left: desc.left + 'px',
    height: desc.height + 'px',
    width: desc.width
  };
  if (desc.backgroundColor !== undefined) props.backgroundColor = ColorLevelMap[desc.backgroundColor];
  if (desc.borderColor !== undefined) props.borderColor = BorderColor;
  if (desc.borderBottomWidth !== undefined) props.borderBottomWidth = desc.borderBottomWidth + 'px';
  if (desc.borderTopWidth !== undefined) props.borderTopWidth = desc.borderTopWidth + 'px';
  if (desc.borderRightWidth !== undefined) props.borderRightWidth = desc.borderRightWidth + 'px';
  if (desc.borderLeftWidth !== undefined) props.borderLeftWidth = desc.borderLeftWidth + 'px';
  return props;
}

/**
 * @param desc 
 * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
 */

function descToHtml(desc, moduleRootDesc) {
  desc = JSON.parse(JSON.stringify(desc));

  if (moduleRootDesc) {
    desc.left = desc.left - moduleRootDesc.left;
    desc.top = desc.top - moduleRootDesc.top;
  }

  var renderProps = transforRenderDescToRenderProps(desc);
  var style = 'z-index:9999999;position:absolute;';

  for (var key in renderProps) {
    style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';';
  }
  return '<div style="' + style + '"></div>';
}

function renderToHtml() {
  var dataString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.__skeleton__x__data;
  var moduleId = arguments.length > 1 ? arguments[1] : undefined;
  if (!dataString) return '';

  var _dataString$split = dataString.split('::'),
      _dataString$split2 = _slicedToArray(_dataString$split, 2),
      renderString = _dataString$split2[0],
      moduleString = _dataString$split2[1];

  var renderDescList = renderString.split(',').map(function (str) {
    return parseStringToRenderDesc(str);
  }); // 渲染模块骨架的情况

  var moduleRootDesc;

  if (moduleId !== undefined) {
    var _moduleMap$moduleId, _moduleMap$moduleId2;

    var moduleMap = moduleString ? JSON.parse(moduleString) : undefined;
    var moduleRootIndex = (_moduleMap$moduleId = moduleMap[moduleId]) === null || _moduleMap$moduleId === void 0 ? void 0 : _moduleMap$moduleId[0];
    var moduleLastIndex = (_moduleMap$moduleId2 = moduleMap[moduleId]) === null || _moduleMap$moduleId2 === void 0 ? void 0 : _moduleMap$moduleId2[1];

    if (moduleRootIndex !== undefined) {
      moduleRootDesc = renderDescList[moduleRootIndex];
      renderDescList = renderDescList.slice(moduleRootIndex, moduleLastIndex + 1);
    }
  }

  var html = '';

  for (var i = 0; i < renderDescList.length; i++) {
    html += descToHtml(renderDescList[i], moduleRootDesc);
  }
  return html;
}

var Skeleton = /*#__PURE__*/function () {
  function Skeleton() {
    _classCallCheck(this, Skeleton);
  }

  _createClass(Skeleton, [{
    key: "getHtml",
    value: function () {
      var _getHtml = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var dataString;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getDataString();

              case 2:
                dataString = _context.sent;
                return _context.abrupt("return", renderToHtml(dataString));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getHtml() {
        return _getHtml.apply(this, arguments);
      }

      return getHtml;
    }()
  }, {
    key: "getDataString",
    value: function () {
      var _getDataString = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var iframe, innerHtml, _yield$Promise, body2, window2, _getRenderData, data, moduleMap, renderData, renderString, moduleString;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                iframe = document.createElement('iframe');
                innerHtml = document.body.innerHTML.replace(/<script\s.*?src=".+?"/, "<script");
                _context2.next = 4;
                return new Promise(function (resolve) {
                  iframe.style.width = "".concat(RefViewportRatio * 100, "vw");
                  iframe.style.height = '100vh';
                  iframe.style.position = 'fixed';
                  iframe.style.zIndex = '-1';
                  iframe.style.top = '0';
                  iframe.style.visibility = 'hidden';
                  document.body.appendChild(iframe);
                  iframe.src = location.href;

                  iframe.onload = function () {
                    iframe.contentDocument.body.innerHTML = innerHtml;
                    resolve({
                      body: iframe.contentDocument.body,
                      window: iframe.contentWindow
                    });
                  };
                });

              case 4:
                _yield$Promise = _context2.sent;
                body2 = _yield$Promise.body;
                window2 = _yield$Promise.window;
                _getRenderData = getRenderData(document.body, body2), data = _getRenderData.data, moduleMap = _getRenderData.moduleMap;
                renderData = data;
                renderString = renderData.map(function (item) {
                  return renderDescToString(item);
                }).join(',');
                moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined;
                document.body.removeChild(iframe);

                if (!moduleString) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", renderString + '::' + moduleString);

              case 14:
                return _context2.abrupt("return", renderString);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getDataString() {
        return _getDataString.apply(this, arguments);
      }

      return getDataString;
    }()
  }]);

  return Skeleton;
}();

(function () {
  var _skltContainer;

  function getSkltContainer() {
    if (_skltContainer) return _skltContainer;
    _skltContainer = document.createElement('div');
    document.body.appendChild(_skltContainer);
    return _skltContainer;
  }

  function clearSkltContainer() {
    if (_skltContainer) {
      document.body.removeChild(_skltContainer);
      _skltContainer = undefined;
    }
  }

  window.addEventListener('load', function () {// console.log('onload');
  });
  var skeleton;
  chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, sender, sendResponse) {
      var textarea;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(request.action === 'generate-skeleton')) {
                _context.next = 5;
                break;
              }

              skeleton = new Skeleton();
              _context.next = 4;
              return skeleton.getHtml();

            case 4:
              getSkltContainer().innerHTML = _context.sent;

            case 5:
              if (request.action === 'clear-skeleton') {
                clearSkltContainer();
              }

              if (request.action === 'set-skeleton-container-opcity') {
                getSkltContainer().style.opacity = request.data;
              }

              if (!(request.action === 'copy-skeleton')) {
                _context.next = 19;
                break;
              }

              textarea = document.createElement('textarea');
              textarea.style.position = 'fixed';
              textarea.style.top = '-200px';
              document.body.appendChild(textarea);
              _context.next = 14;
              return skeleton.getDataString();

            case 14:
              textarea.value = _context.sent;
              textarea.select(); // 选中文本

              document.execCommand("copy");
              alert('骨架代码已拷贝到剪切板');
              document.body.removeChild(textarea);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
})();
