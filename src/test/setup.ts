import '@testing-library/jest-dom'

const MockStorage = {
  state: {} as Record<string, string>,
  setItem(key: string, value: unknown) {
    this.state[key] = JSON.stringify(value)
    this.length = Object.keys(this.state).length
  },
  getItem(key: string) {
    return this.state[key] ?? null
  },
  removeItem(key: string) {
    delete this.state[key]
    this.length = Object.keys(this.state).length
  },
  length: 0,
  clear() {
    this.state = {}
    this.length = 0
  },
  key(index: number) {
    const key = Object.keys(this.state)[index]
    return this.state[key]
  }
}

global.localStorage = MockStorage
