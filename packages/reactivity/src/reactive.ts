import { isObject } from "@vue/shared";
import { mutableHandlers } from "./baseHandler";
import { ReactiveFlags } from "./constants";

const reactiveMap = new WeakMap();

export function reactive(target) {
  return cereateReactiveObject(target);
}

function cereateReactiveObject(target) {
  if (!isObject(target)) return target;

  // 如果是响应式对象，直接返回
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }

  // 如果已经存在代理对象，直接返回
  const exitsProxy = reactiveMap.get(target);
  if (exitsProxy) {
    return exitsProxy;
  }

  let proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
