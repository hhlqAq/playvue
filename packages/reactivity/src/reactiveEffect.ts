import { activeEffect } from "./effect";

const targetMap = new WeakMap(); // 存放依赖收集的关系

export function track(target, key) {
  console.log(`Tracking key: ${key} on target:`, target);
  // 有副作用函数才进行收集
  if (activeEffect) {
    console.log(activeEffect);
  }
}
