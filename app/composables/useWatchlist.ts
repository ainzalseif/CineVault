export function useWatchlist() {
  const ids = useState<string[]>('cinevault-watchlist', () => [])
  const loaded = useState('cinevault-watchlist-loaded', () => false)

  function load() {
    if (loaded.value || !import.meta.client) return

    const saved = localStorage.getItem('cinevault-watchlist')
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
          ids.value = parsed
        } else {
          console.error('Saved watchlist has an unexpected format.')
        }
      } catch (error) {
        console.error('Unable to read the saved watchlist:', error)
      }
    }

    loaded.value = true
  }

  function toggle(id: string) {
    load()
    ids.value = ids.value.includes(id)
      ? ids.value.filter(movieId => movieId !== id)
      : [...ids.value, id]
    localStorage.setItem('cinevault-watchlist', JSON.stringify(ids.value))
  }

  const count = computed(() => ids.value.length)

  return { ids, count, load, toggle }
}
