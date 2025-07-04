export function delayedResolve<T>(returnValue: T, timeout: number) {
  return () =>
    new Promise<T>((resolve) => setTimeout(() => resolve(returnValue), 10));
}

export const createMockFile = (buffer: Buffer): Partial<File> => ({
  size: buffer.length,
});
