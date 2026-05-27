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
    const fallback = [
      { title: 'Local fallback: Edge AI chips surge', summary: 'On-device intelligence pushes privacy-first apps.' },
      { title: 'Local fallback: Green compute trend', summary: 'Efficient model architectures reduce energy usage.' },
      { title: 'Local fallback: Robotics cloud twins', summary: 'Simulation-first robotics cuts prototyping costs.' },
      { title: 'Local fallback: Space data platforms', summary: 'Satellite data APIs enable near-real-time analytics.' },
      { title: 'Local fallback: Smart city pilots', summary: 'Urban sensors optimize mobility and energy balancing.' },
    ]

    const key = import.meta.env.VITE_NEWS_API_KEY
    if (!key) return fallback

    try {
      const { data } = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'AI OR robotics OR future technology',
          pageSize: 5,
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: key,
        },
      })

      if (!data?.articles?.length) return fallback

      return data.articles.map((item) => ({
        title: item.title,
        summary: item.description || 'No summary provided by source.',
      }))
    } catch {
      return fallback
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
