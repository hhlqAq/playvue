// packages/reactivity/src/effect.ts
function effect(fn, options) {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  return _effect;
}
var activeEffect;
var ReactiveEffect = class {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    const prevActiveEffect = activeEffect;
    activeEffect = this;
    try {
      return this.fn();
    } finally {
      activeEffect = prevActiveEffect;
    }
  }
};

// packages/shared/src/index.ts
function isObject(value) {
  return value !== null && typeof value === "object";
}

// packages/reactivity/src/reactiveEffect.ts
function track(target, key) {
  console.log(`Tracking key: ${key} on target:`, target);
  if (activeEffect) {
    console.log(activeEffect);
  }
}

// packages/reactivity/src/baseHandler.ts
var mutableHandlers = {
  get(target, p, receiver) {
    if (p === "__v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
    track(target, p);
    return Reflect.get(target, p, receiver);
  },
  set(target, p, newValue, receiver) {
    return Reflect.set(target, p, newValue, receiver);
  }
};

// packages/reactivity/src/reactive.ts
var reactiveMap = /* @__PURE__ */ new WeakMap();
function reactive(target) {
  return cereateReactiveObject(target);
}
function cereateReactiveObject(target) {
  if (!isObject(target)) return target;
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    return target;
  }
  const exitsProxy = reactiveMap.get(target);
  if (exitsProxy) {
    return exitsProxy;
  }
  let proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
export {
  ReactiveEffect,
  activeEffect,
  effect,
  reactive
};
//# sourceMappingURL=reactivity.js.map
