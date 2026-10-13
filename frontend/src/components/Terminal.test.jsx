import { render, screen, act } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import profile from '../data/profile.json'
import Terminal from './Terminal'

const motion = vi.hoisted(() => ({ reduced: true }))

vi.mock('framer-motion', () => ({
  useReducedMotion: () => motion.reduced,
}))

beforeEach(() => {
  motion.reduced = true
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Terminal com movimento reduzido', () => {
  it('mostra nome em h1 e cargo imediatamente, sem digitação', () => {
    render(<Terminal />)

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getAllByText(profile.role).length).toBeGreaterThan(0)
  })
})

describe('Terminal com animação', () => {
  it('mantém o nome acessível como heading durante a digitação', () => {
    motion.reduced = false
    vi.useFakeTimers()
    render(<Terminal />)

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
  })
})
