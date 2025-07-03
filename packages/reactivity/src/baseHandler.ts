import { ReactiveFlags } from "./constants";
import { track } from "./reactiveEffect";

export const mutableHandlers: ProxyHandler<any> = {
  get(target, p, receiver) {
    if (p === ReactiveFlags.IS_REACTIVE) {
      return true; // 标记为响应式对象
    }
    // TODO: 依赖收集
    track(target, p);

    return Reflect.get(target, p, receiver);
  },
  set(target, p, newValue, receiver) {
    // TODO: 触发依赖更新
    return Reflect.set(target, p, newValue, receiver);
  },
};
