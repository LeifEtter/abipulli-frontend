export function delayedResolve<T>(returnValue: T, timeout: number) {
  return () =>
    new Promise<T>((resolve) => setTimeout(() => resolve(returnValue), 10));
}
