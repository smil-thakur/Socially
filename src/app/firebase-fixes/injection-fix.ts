import { Injector, runInInjectionContext } from '@angular/core';

/**
 * Runs an async function in the injection context. This can be awaited, unlike @see {runInInjectionContext}.
 * For some ungodly reason, only the first awaited call inside the fn callback is actually inside the injection context.
 * After something is awaited, the context is lost.
 *
 * NOTE: Use this sparingly and only when absolutely necessary.
 * This is a band-aid solution for this issue:
 * https://github.com/angular/angularfire/pull/3590
 *
 * @param injector The injector, usually inject(EnvironmentInjector)
 * @param fn The async callback to be awaited
 */
export async function runAsyncInInjectionContext<T>(
  injector: Injector,
  fn: () => Promise<T>
): Promise<T> {
  return await runInInjectionContext(injector, () => {
    return new Promise((resolve, reject) => {
      fn().then(resolve).catch(reject);
    });
  });
}
