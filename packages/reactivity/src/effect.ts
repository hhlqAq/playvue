export function effect(fn, options?) {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });

  _effect.run();

  return _effect;
}

export let activeEffect;

export class ReactiveEffect {
  public active = true;

  constructor(public fn, public scheduler) {}

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
}
