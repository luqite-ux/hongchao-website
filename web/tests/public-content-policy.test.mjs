import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = path.resolve(import.meta.dirname, '..')
const publicRoots = ['app', 'components', 'lib', 'src', 'content', 'data', 'public']
const textExtensions = new Set(['.css', '.html', '.js', '.jsx', '.json', '.md', '.mdx', '.mjs', '.ts', '.tsx', '.txt'])
const prohibitedPromise = /(?:质保|保修|质量保证|\bwar(?:ranty|ranties)\b|\bguarantee(?:d|s|ing)?\b)/giu

function publicTextFiles(directory) {
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return publicTextFiles(target)
    return textExtensions.has(path.extname(entry.name).toLowerCase()) ? [target] : []
  })
}

test('public runtime content contains no prohibited quality or service promises', () => {
  const violations = publicRoots.flatMap((directory) => publicTextFiles(path.join(root, directory))).flatMap((file) => {
    const source = fs.readFileSync(file, 'utf8')
    return [...source.matchAll(prohibitedPromise)].map((match) => {
      const line = source.slice(0, match.index).split(/\r?\n/).length
      return `${path.relative(root, file)}:${line}: ${match[0]}`
    })
  })

  assert.equal(violations.length, 0, `prohibited public promises:\n${violations.join('\n')}`)
})
