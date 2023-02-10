export const debounce = <F extends (...args: F[]) => unknown>(
  fn: F,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout>
  return function(...args: Parameters<F>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}