// Named, restartable setTimeout/setInterval behind one disposable object, so a hook needs
// one cleanup call instead of tracking timer ids by hand. Calling after(key, ...) again
// replaces that key's pending timer instead of stacking duplicates.
export class Timeline {
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>()
  private intervals = new Map<string, ReturnType<typeof setInterval>>()

  after(key: string, ms: number, fn: () => void): void {
    const existing = this.timeouts.get(key)
    if (existing) clearTimeout(existing)
    const id = setTimeout(() => {
      this.timeouts.delete(key)
      fn()
    }, ms)
    this.timeouts.set(key, id)
  }

  every(key: string, ms: number, fn: () => void): void {
    this.stop(key)
    const id = setInterval(fn, ms)
    this.intervals.set(key, id)
  }

  stop(key: string): void {
    const id = this.intervals.get(key)
    if (id) {
      clearInterval(id)
      this.intervals.delete(key)
    }
  }

  // Clears every pending timer without retiring the instance, so scheduling can continue
  // on it afterwards. That's what makes it StrictMode-safe: the dev-mode mount, cleanup,
  // remount cycle disposes and immediately resumes using the same Timeline object.
  dispose(): void {
    for (const id of this.timeouts.values()) clearTimeout(id)
    for (const id of this.intervals.values()) clearInterval(id)
    this.timeouts.clear()
    this.intervals.clear()
  }
}
