function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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
createCommonjsModule(function (module) {
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
function needBorder(borderWidth) {
  return borderWidth !== '0px 0px 0px 0px' && borderWidth !== '0px';
} // 两个元素是否有重叠部分
/**
 * index对应的node是否parentIndex对应node的子孙节点
 * @param list 
 * @param parentIndex
 * @param index 
 */

function isChildren(list, parentIndex, index) {
  var node = list[index];
  var parentId = list[parentIndex].id;
  var parent = list.find(function (item) {
    return item.id === node.parentId;
  });

  while (parent) {
    if (parent.id === parentId) return true;
    parent = list.find(function (item) {
      return item.id === parent.parentId;
    });
  }

  return false;
} // 父节点是否被子节点覆盖


function isCovered(list, targetIndex) {
  var target = list[targetIndex];

  for (var i = targetIndex + 1; i < list.length; i++) {
    var node = list[i]; // 是否脱离文档流

    var targetOutOfDoc = target.position === 'absolute' || target.position === 'fixed';

    if (!targetOutOfDoc && !isChildren(list, targetIndex, i)) {
      return false;
    }

    if (!nodeNeedBg(node)) continue;

    if (node.left <= target.left && node.top <= target.top && node.left + node.width >= target.left + target.width && node.top + node.height >= target.top + target.height) {
      return true;
    }
  }

  return false;
}
/**
 * 保留n为小数
 * @param num 
 * @param bit 
 */

function keepDecimals(num) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return +num.toFixed(n);
}

/**
 * 元素是否出现在视口
 * 只要有一部分在视口返回true
 */
function isPartInViewPort(element) {
  var viewWidth = document.documentElement.clientWidth;
  var viewHeight = document.documentElement.clientHeight;

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
function getFixedPosition(element) {
  var viewport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  var _element$getBoundingC2 = element.getBoundingClientRect(),
      top = _element$getBoundingC2.top,
      right = _element$getBoundingC2.right,
      bottom = _element$getBoundingC2.bottom,
      left = _element$getBoundingC2.left,
      width = _element$getBoundingC2.width,
      height = _element$getBoundingC2.height; // const viewportWidth = viewport.innerWidth;


  var viewportWidth = viewport.document.documentElement.clientWidth;
  var viewportHeight = viewport.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: viewportWidth - right,
    bottom: viewportHeight - bottom,
    width: width,
    height: height,
    vw: viewportWidth,
    vh: viewportHeight
  };
}
/**
 * @param size calc(100vw + 100px) - calc(50vw + 60px)
 * @return calc(50vw - 40px)
 */

function countCss(size) {
  // 去掉calc
  size = size.replace(/calc\((.+?)\)/g, '($1)'); // 去括号

  var bracketReg = /-\s?\((.+?)\)/;
  var bracketsMatch = size.match(bracketReg);

  while (bracketsMatch) {
    var strArr = bracketsMatch[1].split('');

    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i] === '-') {
        strArr[i] = '+';
      } else if (strArr[i] === '+') {
        strArr[i] = '-';
      }
    }

    var str = strArr.join('');
    size = size.replace(bracketReg, '- ' + str);
    bracketsMatch = size.match(bracketReg);
  }

  size = size.replace(/\((.+?)\)/g, '$1');
  var pxList = size.match(/[+-]?\s?(\d+\.)?\d+px/g);
  var vwList = size.match(/[+-]?\s?(\d+\.)?\d+vw/g);
  var vhList = size.match(/[+-]?\s?(\d+\.)?\d+vh/g);
  var px = pxList && new Function('return ' + pxList.join('').replace(/px/g, ''))();
  var vw = vwList && new Function('return ' + vwList.join('').replace(/vw/g, ''))();
  var vh = vhList && new Function('return ' + vhList.join('').replace(/vh/g, ''))();
  var res = '0';

  if (vw && px) {
    res = "calc(".concat(vw, "vw + ").concat(px, "px)");
  } else if (vh && px) {
    res = "calc(".concat(vh, "vh + ").concat(px, "px)");
  } else if (px) {
    res = px + 'px';
  } else if (vw) {
    res = vw + 'vw';
  } else if (vh) {
    res = vh + 'vh';
  }

  res = res.replace(/\+\s-/g, '- ').replace(/\+\s\+/g, '+ ').replace(/$\+/, '');
  return res;
}

var RefViewportRatio = 1.05;
function getComputedSizeList(list, refList) {
  var res = [];
  list.map(function (item, index) {
    var refItem = refList.find(function (i) {
      return i.id === item.id;
    });
    res.push(getComputedSize(item, refItem));
  });
  return res;
}
function getComputedSize(item, refItem, index) {
  var itemSize = getSkeletonDescSize(item);
  var computedSize = {
    left: "".concat(itemSize.pLeft, "vw"),
    top: "".concat(itemSize.top, "px"),
    width: "".concat(itemSize.pWidth, "vw"),
    height: "".concat(itemSize.height, "px")
  };
  if (!refItem) return computedSize;
  var refItemSize = getSkeletonDescSize(refItem);

  var _widthEqual = widthEqual(itemSize, refItemSize);

  var _leftEqual = leftEqual(itemSize, refItemSize);

  var _rightEqual = rightEqual(itemSize, refItemSize);

  var _heightEqual = heightEqual(itemSize, refItemSize);

  var _topEqual = topEqual(itemSize, refItemSize);

  var _bottomEqual = bottomEqual(itemSize, refItemSize);
  /** 计算水平方向的尺寸 */


  if (_widthEqual + _leftEqual + _rightEqual === 0) ; else if (_widthEqual + _leftEqual + _rightEqual >= 30) {
    // 三个值相等取左右vw
    delete computedSize.width;
    computedSize.left = "".concat(itemSize.pLeft, "vw");
    computedSize.right = "".concat(itemSize.pRight, "vw");
  } else if (_widthEqual + _leftEqual + _rightEqual >= 20) {
    // 两个值相等的情况，哪个不等，取另外两个
    computedSize.width = _widthEqual === 10 ? "".concat(itemSize.width, "px") : "".concat(itemSize.pWidth, "vw");
    computedSize.left = _leftEqual === 10 ? "".concat(itemSize.left, "px") : "".concat(itemSize.pLeft, "vw");
    computedSize.right = _rightEqual === 10 ? "".concat(itemSize.right, "px") : "".concat(itemSize.pRight, "vw");

    if (!_widthEqual) {
      delete computedSize.width;
    } else if (!_leftEqual) {
      delete computedSize.left;
    } else {
      delete computedSize.right;
    }
  } else {
    // 只有一个值相等的情况
    // 这种情况只可能是width相等（元素居中的情况）
    // TODO 还有情况是改变视口计算的误差需要处理
    delete computedSize.right;
    computedSize.width = _widthEqual === 10 ? "".concat(itemSize.width, "px") : "".concat(itemSize.pWidth, "vw");
    var midOffset = document.documentElement.clientWidth * 0.5 - itemSize.left;
    computedSize.left = midOffset > 0 ? "calc(50vw - ".concat(midOffset, "px)") : "calc(50vw + ".concat(-midOffset, "px)");
  }
  /** 计算垂直方向的尺寸 */


  if (_heightEqual + _topEqual + _bottomEqual === 0) ; else if (_heightEqual + _topEqual + _bottomEqual >= 30) {
    // 三个值相等取上下vh
    delete computedSize.height;
    computedSize.top = "".concat(itemSize.pTop, "vh");
    computedSize.bottom = "".concat(itemSize.pBottom, "vh");
  } else if (_heightEqual + _topEqual + _bottomEqual >= 20) {
    // 两个值相等的情况，哪个不等，取另外两个
    computedSize.height = _heightEqual === 10 ? "".concat(itemSize.height, "px") : "".concat(itemSize.pHeight, "vh");
    computedSize.top = _topEqual === 10 ? "".concat(itemSize.top, "px") : "".concat(itemSize.pTop, "vh");
    computedSize.bottom = _bottomEqual === 10 ? "".concat(itemSize.bottom, "px") : "".concat(itemSize.pBottom, "vh");

    if (!_heightEqual) {
      delete computedSize.height;
    } else if (!topEqual) {
      delete computedSize.top;
    } else {
      delete computedSize.bottom;
    }
  } else {
    // 只有一个值相等的情况
    // 这种情况只可能是height相等（元素居中的情况）
    // TODO 还有情况是改变视口计算的误差需要处理
    delete computedSize.bottom;
    computedSize.height = _heightEqual === 10 ? "".concat(itemSize.height, "px") : "".concat(itemSize.pHeight, "vh");

    var _midOffset = document.documentElement.clientHeight * 0.5 - itemSize.top;

    computedSize.top = _midOffset > 0 ? "calc(50vh - ".concat(_midOffset, "px)") : "calc(50vh + ".concat(-_midOffset, "px)");
  }

  return computedSize;
}

function getSkeletonDescSize(item) {
  return {
    width: keepDecimals(item.width),
    height: keepDecimals(item.height),
    left: keepDecimals(item.left),
    right: keepDecimals(item.right),
    top: keepDecimals(item.top),
    bottom: keepDecimals(item.bottom),
    pWidth: keepDecimals(item.width / item.vw * 100),
    pHeight: keepDecimals(item.height / item.vh * 100),
    pLeft: keepDecimals(item.left / item.vw * 100),
    pRight: keepDecimals(item.right / item.vw * 100),
    pTop: keepDecimals(item.top / item.vh * 100),
    pBottom: keepDecimals(item.bottom / item.vh * 100)
  };
}
/**
 * 0代表不相等
 * 10代表px相等
 * 11代表vw相等
 */


function widthEqual(size1, size2) {
  if (size1.width === size2.width) return 10;
  if (Math.abs(size1.pWidth - size2.pWidth) < 0.1) return 11;
  return 0;
}

function heightEqual(size1, size2) {
  if (size1.height === size2.height) return 10;
  if (Math.abs(size1.pHeight - size2.pHeight) < 0.1) return 11;
  return 0;
}

function topEqual(size1, size2) {
  if (size1.top === size2.top) return 10;
  if (Math.abs(size1.pTop - size2.pTop) < 0.1) return 11;
  return 0;
}

function bottomEqual(size1, size2) {
  if (size1.bottom === size2.bottom) return 10;
  if (Math.abs(size1.pBottom - size2.pBottom) < 0.1) return 11;
  return 0;
}

function leftEqual(size1, size2) {
  if (size1.left === size2.left) return 10;
  if (Math.abs(size1.pLeft - size2.pLeft) < 0.1) return 11;
  return 0;
}

function rightEqual(size1, size2) {
  if (size1.right === size2.right) return 10;
  if (Math.abs(size1.pRight - size2.pRight) < 0.1) return 11;
  return 0;
}

/**
 * 骨架描述转为骨架渲染描述
 */
function toRenderDescList(descList, computedSizeList) {
  var res = []; // borderColor:  #8e9097
  // const ColorLevelMap = [
  //   '#D3D4D7',
  //   '#E9EAEB',
  //   '#F4F4F5',
  //   '#FFF'
  // ]
  // const colorLevelList = getColorLevelList(descList);
  // console.log('colorLevelList', colorLevelList);

  for (var index in descList) {
    var node = descList[index];
    var computedSize = computedSizeList[index];
    var renderDesc = {
      width: computedSize.width,
      height: computedSize.height,
      top: computedSize.top,
      right: computedSize.right,
      bottom: computedSize.bottom,
      left: computedSize.left,
      borderWidth: needBorder(node.borderWidth) ? node.borderWidth : undefined,
      borderRadius: node.borderRadius === '0px' ? undefined : node.borderRadius
    };

    if (nodeNeedBg(node)) {
      // renderDesc.backgroundColor = colorLevelList[index];
      renderDesc.backgroundColor = 1;
    }

    res.push(renderDesc);
  }

  return res;
}

/**
 * 骨架渲染描述转为骨架节点render props
 */
function transforRenderDescToRenderProps(desc) {
  // const ColorLevelMap = [
  //   '#D3D4D7',
  //   '#E9EAEB',
  //   '#F4F4F5',
  //   '#FFF'
  // ];
  var props = {
    top: desc.top,
    left: desc.left,
    height: desc.height,
    width: desc.width,
    bottom: desc.bottom,
    right: desc.right,
    borderRadius: desc.borderRadius,
    borderWidth: desc.borderWidth
  };
  if (desc.backgroundColor !== undefined) props.background = 'linear-gradient(90deg,rgb(190 190 190 / 20%) 25%,hsla(0,0%,50.6%,.24) 37%,hsla(0,0%,74.5%,.2) 63%); background-size: 400% 100%;'; // if (desc.backgroundColor !== undefined) props.background = `hsl(0,0%,${(1 - (desc.backgroundColor / 10)) * 100}%)`;

  if (desc.borderWidth !== undefined) props.borderColor = 'rgb(190 190 190 / 20%)';
  return props;
}
var SplitSymbol = '|';
/**
 * 使用SplitSymbol分隔RenderDesc的属性值，固化属性的顺序
 * @return string
 */

function renderDescToString(desc) {
  return [desc.width, desc.height, desc.top, desc.right, desc.bottom, desc.left, desc.borderRadius, desc.borderWidth, desc.backgroundColor].join(SplitSymbol);
}
function parseStringToRenderDesc(str) {
  var values = str.split(SplitSymbol);
  return {
    width: values[0] || undefined,
    height: values[1] || undefined,
    top: values[2] || undefined,
    right: values[3] || undefined,
    bottom: values[4] || undefined,
    left: values[5] || undefined,
    borderRadius: values[6] || undefined,
    borderWidth: values[7] || undefined,
    backgroundColor: values[8] || undefined
  };
}
function getRenderDescFromSkeletonDom(root) {
  var nodeList = root.querySelectorAll('.skeleton-x-node');
  var descList = [];
  nodeList.forEach(function (node) {
    var style = node.style;
    var desc = {
      width: style.width || undefined,
      height: style.height || undefined,
      top: style.top || undefined,
      right: style.right || undefined,
      bottom: style.bottom || undefined,
      left: style.left || undefined
    };

    if (style.borderRadius) {
      desc.borderRadius = style.borderRadius;
    }

    if (style.borderWidth) {
      desc.borderWidth = style.borderWidth;
    }

    if (style.background) {
      desc.backgroundColor = 1;
    }

    descList.push(desc);
  });
  return descList;
}
function joinRenderString(renderData) {
  var data = renderData.data,
      moduleMap = renderData.moduleMap;
  var dataString = data.map(function (item) {
    return renderDescToString(item);
  }).join(',');
  var moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined;
  var res = dataString;

  if (moduleString) {
    res = dataString + '::' + moduleString;
  }
  return res;
}
function parseRenderString(renderString) {
  var _renderString$split = renderString.split('::'),
      _renderString$split2 = _slicedToArray(_renderString$split, 2),
      dataString = _renderString$split2[0],
      moduleString = _renderString$split2[1];

  var data = dataString.split(',').map(function (str) {
    return parseStringToRenderDesc(str);
  });
  var moduleMap = moduleString ? JSON.parse(moduleString) : undefined;
  return {
    data: data,
    moduleMap: moduleMap
  };
}

// 提取moduleId
function getModuleId(nodeSkltModuleId, parentDesc) {
  var _parentDesc$moduleId, _moduleId;

  var moduleId = undefined;
  var parentModuleId = (_parentDesc$moduleId = parentDesc === null || parentDesc === void 0 ? void 0 : parentDesc.moduleId) !== null && _parentDesc$moduleId !== void 0 ? _parentDesc$moduleId : [];

  if (nodeSkltModuleId || parentModuleId !== null && parentModuleId !== void 0 && parentModuleId.length) {
    moduleId = [].concat(_toConsumableArray(parentModuleId), [nodeSkltModuleId]).filter(function (i) {
      return i;
    });
  }

  if (!((_moduleId = moduleId) !== null && _moduleId !== void 0 && _moduleId.length)) moduleId = undefined;
  return moduleId;
}
function getModuleMap(descList) {
  var ModuleMap;

  for (var i in descList) {
    var desc = descList[i];
    var moduleId = desc.moduleId;

    if (moduleId !== null && moduleId !== void 0 && moduleId.length) {
      ModuleMap = ModuleMap || {};

      var _iterator = _createForOfIteratorHelper(moduleId),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var id = _step.value;

          if (!ModuleMap[id]) {
            ModuleMap[id] = [Number(i), Number(i)];
          } else {
            ModuleMap[id][1] = Number(i);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  return ModuleMap;
}
function toModuleRelativeDesc(desc, moduleRootDesc) {
  desc = JSON.parse(JSON.stringify(desc));

  if (moduleRootDesc) {
    desc.left = countCss("".concat(desc.left, " - ").concat(moduleRootDesc.left));
    if (desc.right && moduleRootDesc.right) desc.right = countCss("".concat(desc.right, " - ").concat(moduleRootDesc.right));
    desc.top = countCss("".concat(desc.top, " - ").concat(moduleRootDesc.top));
    if (desc.bottom && moduleRootDesc.bottom) desc.bottom = countCss("".concat(desc.bottom, " - ").concat(moduleRootDesc.bottom));
  }
  return desc;
}
function updateModuleMap(opt) {
  var moduleMap = opt.moduleMap,
      addedList = opt.addedList,
      removedList = opt.removedList;
  removedList === null || removedList === void 0 ? void 0 : removedList.map(function (id) {
    Object.values(moduleMap).map(function (item) {
      if (id <= item[1]) item[1]--;
      if (id <= item[0]) item[0]--;
    });
  });
  addedList === null || addedList === void 0 ? void 0 : addedList.map(function (id) {
    Object.values(moduleMap).map(function (item) {
      if (id < item[1]) item[1]++;
      if (id < item[0]) item[0]++;
    });
  });
  return moduleMap;
}

var SkeletonRootId = 'skeleton-x-root';
var IgnoreAttrName = 'skeletonx-ignore';

/** 骨架元素描述 */

/**
 * 获取骨架节点描述扁平数据
 * @param root 根元素
 */
function getSkeletonDescList(root) {
  var viewport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var list = generateSkeletonDescList({
    node: root,
    viewport: viewport
  });
  list = clipSkeletonDescList(list);
  list = reduceSkeletonDescList(list);
  return list;
}
/**
 * 提取骨架描述
 */

function getSkeletonDesc(opt) {
  var _element$parentElemen, _element$getAttribute;

  var node = opt.node,
      index = opt.index,
      parentDesc = opt.parentDesc,
      _opt$viewport = opt.viewport,
      viewport = _opt$viewport === void 0 ? window : _opt$viewport;

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

  if (element.id === SkeletonRootId || ((_element$parentElemen = element.parentElement) === null || _element$parentElemen === void 0 ? void 0 : _element$parentElemen.id) === SkeletonRootId) return null;
  if (element.getAttribute(IgnoreAttrName) !== null) return null; // skeletonx-ignore

  var style = getComputedStyle(element);
  /** 过滤不可见元素 */

  var ignore = false;
  if (style.display === 'none') ignore = true;else if (style.visibility === 'hidden') ignore = true;else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  var nodeSkltModuleId = (_element$getAttribute = element.getAttribute('skeletonx-module-id')) !== null && _element$getAttribute !== void 0 ? _element$getAttribute : undefined;
  return _objectSpread2(_objectSpread2({
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? "".concat(parentDesc.id, "[").concat(index, "]") : '',
    moduleRoot: nodeSkltModuleId ? true : undefined,
    moduleId: getModuleId(nodeSkltModuleId, parentDesc),
    tagName: element.tagName
  }, getFixedPosition(element, viewport)), {}, {
    borderWidth: style.borderWidth,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    backgroundColor: style.backgroundColor,
    backgroundImage: style.backgroundImage,
    overflowX: style.overflowX,
    overflowY: style.overflowY,
    position: style.position,
    // @ts-ignore
    $node: node // for debug TODO delete 

  });
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
      list = _opt$list === void 0 ? [] : _opt$list,
      _opt$viewport2 = opt.viewport,
      viewport = _opt$viewport2 === void 0 ? window : _opt$viewport2;
  var skeletonDesc = getSkeletonDesc({
    node: node,
    index: index,
    parentDesc: parentDesc,
    viewport: viewport
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
        list: list,
        viewport: viewport
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
          if (child.left < node.left) child.left = node.left;
          if (child.left + child.width > node.left + node.width) child.width = node.width - (child.left - node.left);
        }

        if (node.overflowY !== 'visible') {
          // 纵向被裁剪
          //   child.height = node.height;
          if (child.top < node.top) child.top = node.top;
          if (child.top + child.height > node.top + node.height) child.height = node.height - (child.top - node.top);
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
    // 无背景色
    var noBg = /rgba\((\d+,\s*){3}0\)/.test(node.backgroundColor) && node.backgroundImage === 'none'; // 无文本

    var noText = !node.containTextNode; // 无边框

    var noBorder = node.borderWidth === '0px 0px 0px 0px' || node.borderWidth === '0px'; // 无阴影

    var noShadow = node.boxShadow === 'none'; // 无尺寸

    var noSize = node.width * node.height <= 0;
    /** 白色body */

    var whiteBody = node.tagName.toLowerCase() === 'body' && node.backgroundColor === 'rgb(255, 255, 255)';
    var covered = isCovered(list, index);
    /*被覆盖*/

    if (['img', 'svg'].includes(node.tagName.toLowerCase()) && !noSize && !covered) {
      return true;
    }

    if (node.moduleRoot) {
      return true;
    } // 删掉节点


    if (noBg && noText && noBorder && noShadow || noSize || whiteBody || covered) {
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
  return res;
}
function getRenderData(root, root2, viewport2) {
  var descList = getSkeletonDescList(root, window);
  var descList2 = root2 ? getSkeletonDescList(root2, viewport2) : [];
  console.log('desclist', descList);
  console.log('desclist2', descList2);
  var computedSizeList = getComputedSizeList(descList, descList2);
  console.log('computedSizeList', computedSizeList);
  var renderList = toRenderDescList(descList, computedSizeList);
  var moduleMap = getModuleMap(descList);
  console.log('render data', renderList);
  console.log('module map', moduleMap);
  return {
    data: renderList,
    moduleMap: moduleMap
  };
}

/**
 * @param desc 
 * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
 */

function descToHtml(desc, index, moduleRootDesc) {
  desc = toModuleRelativeDesc(desc, moduleRootDesc);
  var renderProps = transforRenderDescToRenderProps(desc);
  var style = 'z-index:9999999;position:absolute;';

  for (var key in renderProps) {
    var value = renderProps[key];
    if (!value) continue;
    style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';';
  }
  return '<div id="' + index + '" class="skeleton-x-node" style="' + style + '"></div>';
}

function renderToHtml(renderString, moduleId) {
  var _renderString;

  renderString = (_renderString = renderString) !== null && _renderString !== void 0 ? _renderString : window.__skeleton__x__lib.getData();
  if (!renderString) return '';

  var _parseRenderString = parseRenderString(renderString),
      data = _parseRenderString.data,
      moduleMap = _parseRenderString.moduleMap; // 渲染模块骨架的情况


  var moduleRootDesc;

  if (moduleId !== undefined) {
    var _moduleMap$moduleId, _moduleMap$moduleId2;

    var moduleRootIndex = (_moduleMap$moduleId = moduleMap[moduleId]) === null || _moduleMap$moduleId === void 0 ? void 0 : _moduleMap$moduleId[0];
    var moduleLastIndex = (_moduleMap$moduleId2 = moduleMap[moduleId]) === null || _moduleMap$moduleId2 === void 0 ? void 0 : _moduleMap$moduleId2[1];

    if (moduleRootIndex !== undefined) {
      moduleRootDesc = data[moduleRootIndex];
      data = data.slice(moduleRootIndex, moduleLastIndex + 1);
    }
  }

  var html = '';

  for (var i = 0; i < data.length; i++) {
    html += descToHtml(data[i], i, moduleRootDesc);
  }
  return html;
}

var Skeleton = /*#__PURE__*/function () {
  function Skeleton() {
    _classCallCheck(this, Skeleton);
  }

  _createClass(Skeleton, [{
    key: "getRenderData",
    value: function () {
      var _getRenderData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var iframe, innerHtml, _yield$Promise, body2, window2, renderData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.renderData) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this.renderData);

              case 2:
                iframe = document.createElement('iframe');
                innerHtml = document.documentElement.innerHTML.replace(/<script\s.*?src=".+?"/, "<script");
                _context.next = 6;
                return new Promise(function (resolve) {
                  iframe.style.width = "".concat(RefViewportRatio * 100, "vw");
                  iframe.style.height = "".concat(RefViewportRatio * 100, "vh");
                  iframe.style.position = 'fixed';
                  iframe.style.zIndex = '-1';
                  iframe.style.top = '0';
                  iframe.style.left = '0';
                  iframe.style.visibility = 'hidden';

                  iframe.onload = function () {
                    try {
                      iframe.contentDocument.documentElement.innerHTML = innerHtml;
                      setTimeout(function () {
                        resolve({
                          body: iframe.contentDocument.body,
                          window: iframe.contentWindow
                        });
                      }, 1000); // 延迟1s，保证html渲染完成
                    } catch (error) {
                      console.warn('iframe error', error);
                      resolve({
                        body: null,
                        window: null
                      });
                    }
                  };

                  document.body.appendChild(iframe);
                  iframe.src = location.href;
                });

              case 6:
                _yield$Promise = _context.sent;
                body2 = _yield$Promise.body;
                window2 = _yield$Promise.window;
                renderData = getRenderData(document.body, body2, window2);
                document.body.removeChild(iframe);
                this.renderData = renderData;
                return _context.abrupt("return", renderData);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRenderData$1() {
        return _getRenderData2.apply(this, arguments);
      }

      return getRenderData$1;
    }()
  }, {
    key: "getDataString",
    value: function () {
      var _getDataString = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var renderData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getRenderData();

              case 2:
                renderData = _context2.sent;
                return _context2.abrupt("return", joinRenderString(renderData));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDataString() {
        return _getDataString.apply(this, arguments);
      }

      return getDataString;
    }()
  }, {
    key: "getHtml",
    value: function () {
      var _getHtml = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var renderString;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getDataString();

              case 2:
                renderString = _context3.sent;
                return _context3.abrupt("return", renderToHtml(renderString));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getHtml() {
        return _getHtml.apply(this, arguments);
      }

      return getHtml;
    }()
  }, {
    key: "saveRenderData",
    value: function saveRenderData(root) {
      if (!root) return false;
      this.renderData.data = getRenderDescFromSkeletonDom(root);
      return true;
    }
  }, {
    key: "updateModuleMap",
    value: function updateModuleMap$1(opt) {
      if (!this.renderData.moduleMap) {
        return;
      }

      updateModuleMap(_objectSpread2({
        moduleMap: this.renderData.moduleMap
      }, opt));
    }
  }, {
    key: "importRenderString",
    value: function importRenderString(renderString) {
      try {
        this.renderData = parseRenderString(renderString);
        console.log(this.renderData);
      } catch (err) {
        console.error(err);
        return false;
      }

      return true;
    }
  }]);

  return Skeleton;
}();

var template = "<html>\n<head>\n\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\n  <!-- css库，需要引入到项目 -->\n  <style>\n    <%=data.cssLib%>\n  </style>\n\n\n  <!-- js库，需要引入到项目 -->\n  <script>\n    <%=data.jsLib%>\n  </script>\n  <script>\n    // __skeleton__x__lib 为 js库 写入的变量，覆盖getDate方法返回骨架数据\n    __skeleton__x__lib.getData = function () {\n      /** !!! 每次新生成骨架屏，将新生成的数据拷贝过来即可 */\n      return '<%=data.data%>'\n    }\n  </script>\n</head>\n<body>\n  <!-- 输入html -->\n  <script>\n    document.write(__skeleton__x__lib.renderToHtml())\n  </script>\n</body>\n</html>";

var cssLib = ".skeleton-x-node{animation:skeleton-loading 2.4s ease infinite}@keyframes skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}";

var jsLib = "var __skeleton__x__lib=function(t){\"use strict\";function r(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if(\"undefined\"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var o=[],e=!0,n=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(e=(a=c.next()).done)&&(o.push(a.value),!r||o.length!==r);e=!0);}catch(t){n=!0,i=t}finally{try{e||null==c.return||c.return()}finally{if(n)throw i}}return o}(t,r)||function(t,r){if(!t)return;if(\"string\"==typeof t)return o(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);\"Object\"===e&&t.constructor&&(e=t.constructor.name);if(\"Map\"===e||\"Set\"===e)return Array.from(t);if(\"Arguments\"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return o(t,r)}(t,r)||function(){throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}()}function o(t,r){(null==r||r>t.length)&&(r=t.length);for(var o=0,e=new Array(r);o<r;o++)e[o]=t[o];return e}function e(t){var r={top:t.top,left:t.left,height:t.height,width:t.width,bottom:t.bottom,right:t.right,borderRadius:t.borderRadius,borderWidth:t.borderWidth};return void 0!==t.backgroundColor&&(r.background=\"linear-gradient(90deg,rgb(190 190 190 / 20%) 25%,hsla(0,0%,50.6%,.24) 37%,hsla(0,0%,74.5%,.2) 63%); background-size: 400% 100%;\"),void 0!==t.borderWidth&&(r.borderColor=\"rgb(190 190 190 / 20%)\"),r}function n(t){var o=r(t.split(\"::\"),2),e=o[0],n=o[1];return{data:e.split(\",\").map((function(t){return function(t){var r=t.split(\"|\");return{width:r[0]||void 0,height:r[1]||void 0,top:r[2]||void 0,right:r[3]||void 0,bottom:r[4]||void 0,left:r[5]||void 0,borderRadius:r[6]||void 0,borderWidth:r[7]||void 0,backgroundColor:r[8]||void 0}}(t)})),moduleMap:n?JSON.parse(n):void 0}}function i(t){for(var r=/-\\s?\\((.+?)\\)/,o=(t=t.replace(/calc\\((.+?)\\)/g,\"($1)\")).match(r);o;){for(var e=o[1].split(\"\"),n=0;n<e.length;n++)\"-\"===e[n]?e[n]=\"+\":\"+\"===e[n]&&(e[n]=\"-\");var i=e.join(\"\");o=(t=t.replace(r,\"- \"+i)).match(r)}var a=(t=t.replace(/\\((.+?)\\)/g,\"$1\")).match(/[+-]?\\s?(\\d+\\.)?\\d+px/g),c=t.match(/[+-]?\\s?(\\d+\\.)?\\d+vw/g),l=t.match(/[+-]?\\s?(\\d+\\.)?\\d+vh/g),d=a&&new Function(\"return \"+a.join(\"\").replace(/px/g,\"\"))(),u=c&&new Function(\"return \"+c.join(\"\").replace(/vw/g,\"\"))(),v=l&&new Function(\"return \"+l.join(\"\").replace(/vh/g,\"\"))(),h=\"0\";return u&&d?h=\"calc(\".concat(u,\"vw + \").concat(d,\"px)\"):v&&d?h=\"calc(\".concat(v,\"vh + \").concat(d,\"px)\"):d?h=d+\"px\":u?h=u+\"vw\":v&&(h=v+\"vh\"),h=h.replace(/\\+\\s-/g,\"- \").replace(/\\+\\s\\+/g,\"+ \").replace(/$\\+/,\"\")}function a(t,r,o){var n=e(t=function(t,r){return t=JSON.parse(JSON.stringify(t)),r&&(t.left=i(\"\".concat(t.left,\" - \").concat(r.left)),t.right&&r.right&&(t.right=i(\"\".concat(t.right,\" - \").concat(r.right))),t.top=i(\"\".concat(t.top,\" - \").concat(r.top)),t.bottom&&r.bottom&&(t.bottom=i(\"\".concat(t.bottom,\" - \").concat(r.bottom)))),t}(t,o)),a=\"z-index:9999999;position:absolute;\";for(var c in n){n[c]&&(a+=c.replace(/([a-z])([A-Z])/g,\"$1-$2\").toLowerCase()+\":\"+n[c]+\";\")}return'<div id=\"'+r+'\" class=\"skeleton-x-node\" style=\"'+a+'\"></div>'}return t.getData=function(){},t.getModuleSize=function(t,r){var o,a,c={height:\"0px\"};if(!(t=null!==(o=t)&&void 0!==o?o:window.__skeleton__x__lib.getData())||!r)return c;var l=n(t),d=l.data,u=null===(a=l.moduleMap[r])||void 0===a?void 0:a[0];if(void 0===u)return c;var v=d[u];if(!v)return c;var h=e(v);return h.height?c.height=h.height:c.height=i(\"100vh - \".concat(h.bottom,\" - \").concat(h.top)),c},t.renderToHtml=function(t,r){var o;if(!(t=null!==(o=t)&&void 0!==o?o:window.__skeleton__x__lib.getData()))return\"\";var e,i=n(t),c=i.data,l=i.moduleMap;if(void 0!==r){var d,u,v=null===(d=l[r])||void 0===d?void 0:d[0],h=null===(u=l[r])||void 0===u?void 0:u[1];void 0!==v&&(e=c[v],c=c.slice(v,h+1))}for(var f=\"\",g=0;g<c.length;g++)f+=a(c[g],g,e);return f},Object.defineProperty(t,\"__esModule\",{value:!0}),t}({});\n";

//@ts-ignore
function copyData(data) {
  var textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.top = '-200px';
  document.body.appendChild(textarea);
  textarea.value = data;
  textarea.select(); // 选中文本

  document.execCommand("copy");
  document.body.removeChild(textarea);
  return data;
}
function download(opt) {
  var data = opt.data,
      filename = opt.filename;
  var url = URL.createObjectURL(new Blob([data]));
  var aTag = document.createElement('a');
  aTag.download = filename;
  aTag.href = url;
  aTag.click();
}
function getDemo(opt) {
  var data = opt.data;
  var templateData = {
    data: data,
    cssLib: cssLib,
    jsLib: jsLib
  };
  return tmpl(template, templateData);
}

function tmpl(input, data) {
  var code = "const result = [];";
  code += "result.push(`".concat(input.replace(/<%=(.+?)%>/g, '`); result.push($1); result.push(`').replace(/<%(.+?)%>/g, '`); $1 result.push(`'), "`);");
  code += "return result.join('');";
  return new Function('data', code)(data);
}

(function () {
  var _skltContainer;

  var mutationObserver;
  var skeleton;
  var tabId;

  var mutationObserverCb = function mutationObserverCb(mutationsList, observer) {
    var _iterator = _createForOfIteratorHelper(mutationsList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mutation = _step.value;

        if (mutation.type === 'childList') {
          var _ret = function () {
            var _mutation$addedNodes, _mutation$removedNode, _mutation$addedNodes2, _mutation$removedNode2;

            if (((_mutation$addedNodes = mutation.addedNodes) === null || _mutation$addedNodes === void 0 ? void 0 : _mutation$addedNodes.length) > 1 || ((_mutation$removedNode = mutation.removedNodes) === null || _mutation$removedNode === void 0 ? void 0 : _mutation$removedNode.length) > 1) {
              alert('目前仅支持每次增删一个元素'); // TODO 多个元素，基准id还需要处理

              renderSkeleton();
              return {
                v: void 0
              };
            }

            if ((_mutation$addedNodes2 = mutation.addedNodes) !== null && _mutation$addedNodes2 !== void 0 && _mutation$addedNodes2.length && (_mutation$removedNode2 = mutation.removedNodes) !== null && _mutation$removedNode2 !== void 0 && _mutation$removedNode2.length) {
              alert('暂不支持移动元素');
              renderSkeleton();
              return {
                v: void 0
              };
            }

            var addedList = void 0;
            var removedList = void 0;

            if (mutation.addedNodes) {
              addedList = [];
              Array.from(mutation.addedNodes).map(function (node) {
                addedList.push(Number(node.previousSibling.id || -1));
              });
            }

            if (mutation.removedNodes) {
              removedList = [];
              Array.from(mutation.removedNodes).map(function (node) {
                removedList.push(Number(node.id));
              });
            }

            skeleton.updateModuleMap({
              addedList: addedList,
              removedList: removedList
            });
            skeleton.saveRenderData(document.querySelector("#".concat(SkeletonRootId)));
            renderSkeleton();
          }();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  function getSkltContainer() {
    if (_skltContainer) return _skltContainer;
    _skltContainer = document.createElement('div');
    _skltContainer.id = SkeletonRootId;
    document.body.appendChild(_skltContainer);
    mutationObserver = new MutationObserver(mutationObserverCb);
    return _skltContainer;
  }

  function clearSkltContainer() {
    if (_skltContainer) {
      document.body.removeChild(_skltContainer);
      _skltContainer = undefined;
    }

    mutationObserver && mutationObserver.disconnect();
    mutationObserver = undefined;
  }

  function copySkeletonData() {
    return _copySkeletonData.apply(this, arguments);
  }

  function _copySkeletonData() {
    _copySkeletonData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (skeleton) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", alert('请先生成骨架屏'));

            case 2:
              _context2.next = 4;
              return skeleton.getDataString();

            case 4:
              data = _context2.sent;

              if (data) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", alert('请先生成骨架屏'));

            case 7:
              copyData(data);
              alert('骨架屏数据已拷贝到剪切板');
              console.log(data);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _copySkeletonData.apply(this, arguments);
  }

  function saveSkeletonData() {
    var root = document.querySelector("#".concat(SkeletonRootId));

    if (root && skeleton) {
      skeleton.saveRenderData(root);
    }
  }

  function generateSkeleton() {
    return _generateSkeleton.apply(this, arguments);
  }

  function _generateSkeleton() {
    _generateSkeleton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              skeleton = new Skeleton();
              _context3.next = 3;
              return renderSkeleton();

            case 3:
              cancleLoading();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _generateSkeleton.apply(this, arguments);
  }

  function renderSkeleton() {
    return _renderSkeleton.apply(this, arguments);
  }

  function _renderSkeleton() {
    _renderSkeleton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mutationObserver && mutationObserver.disconnect();
              _context4.next = 3;
              return skeleton.getHtml();

            case 3:
              _context4.t0 = _context4.sent;
              getSkltContainer().innerHTML = "<div class=\"skeleton-x-mask\"></div>" + _context4.t0;
              mutationObserver.observe(_skltContainer, {
                childList: true
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _renderSkeleton.apply(this, arguments);
  }

  function sendMessage(message) {
    chrome.runtime.sendMessage(_objectSpread2({
      tag: 'content',
      tabId: tabId
    }, message));
  }

  chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, sender, sendResponse) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!((request === null || request === void 0 ? void 0 : request.tag) === 'content')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (request.action === 'set-tab-id') {
                tabId = request.tabId;
              }

              if (request.action === 'set-loading') {
                request.loading ? loading(true) : cancleLoading(true);
              }

              if (request.action === 'import-data') {
                skeleton = new Skeleton();

                if (skeleton.importRenderString(request.data)) {
                  renderSkeleton();
                } else {
                  alert('数据解析失败');
                }
              }

              if (request.action === 'generate-skeleton') {
                generateSkeleton();
              }

              if (request.action === 'clear-skeleton') {
                clearSkltContainer();
              }

              if (request.action === 'set-skeleton-container-opcity') {
                getSkltContainer().style.opacity = request.value;
              }

              if (request.action === 'export-data') {
                saveSkeletonData();
                copySkeletonData();
              }

              if (!(request.action === 'export-demo')) {
                _context.next = 20;
                break;
              }

              saveSkeletonData();

              if (skeleton) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", alert('请先生成骨架屏'));

            case 13:
              _context.next = 15;
              return skeleton.getDataString();

            case 15:
              data = _context.sent;

              if (data) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", alert('请先生成骨架屏'));

            case 18:
              download({
                data: getDemo({
                  data: data
                }),
                filename: 'skeleton-demo.html'
              });
              copySkeletonData();

            case 20:
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
  var loadingEl;

  function loading(fromMessage) {
    if (!fromMessage) {
      sendMessage({
        action: 'set-loading',
        loading: true
      });
    }

    if (!loadingEl) {
      loadingEl = document.createElement('div');
      loadingEl.className = 'skeleton-x-loading';
      loadingEl.setAttribute(IgnoreAttrName, '');
      loadingEl.innerHTML = "<div class=\"lds-dual-ring\"></div>";
    }

    if (!document.body.contains(loadingEl)) document.body.appendChild(loadingEl);
  }

  function cancleLoading(fromMessage) {
    if (!fromMessage) {
      sendMessage({
        action: 'set-loading',
        loading: false
      });
    }

    loadingEl && document.body.removeChild(loadingEl);
  }
})();
