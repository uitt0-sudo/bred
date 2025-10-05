import { describe, it, expect } from 'vitest'
describe('sample quiz',()=>{ it('scores answer',()=>{ const q={c:2}; const pick=(i)=> i===q.c; expect(pick(2)).toBe(true); expect(pick(1)).toBe(false) }) })
