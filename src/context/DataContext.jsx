import axios from 'axios'
import { createContext, useContext, useMemo, useState } from 'react'
import { posts } from '../data/posts.js'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return posts
    return posts.filter((post) => {
      const index = `${post.title} ${post.summary} ${post.category}`.toLowerCase()
      return index.includes(query)
    })
  }, [searchTerm])

  const getNews = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      return data.map((item) => ({
        title: item.title,
        summary: item.body,
      }))
    } catch {
      return [
        { title: 'Local fallback: Edge AI chips surge', summary: 'On-device intelligence pushes privacy-first apps.' },
        { title: 'Local fallback: Green compute trend', summary: 'Efficient model architectures reduce energy usage.' },
      ]
    }
  }

  const value = useMemo(
    () => ({
      posts,
      filteredPosts,
      searchTerm,
      setSearchTerm,
      getNews,
    }),
    [filteredPosts, searchTerm],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
