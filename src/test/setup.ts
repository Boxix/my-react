import '@testing-library/jest-dom'

// mock window.localStorage
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
  },
}

global.localStorage = MockStorage

// mock window.matchMedia for antd
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
