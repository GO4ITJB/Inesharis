const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://inesharis.test/wp/wp-json/wp/v2'

export interface Post {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  slug: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface Page {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  slug: string
}

// Generic function to make API requests
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${WORDPRESS_API_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)
    return []
  }
}

// Get posts with optional limit
export async function getPosts(limit?: number): Promise<Post[]> {
  const params = new URLSearchParams({
    _embed: 'true',
    ...(limit && { per_page: limit.toString() }),
  })
  
  return fetchAPI(`/posts?${params}`)
}

// Get a single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  const posts = await fetchAPI(`/posts?slug=${slug}&_embed=true`)
  return posts[0] || null
}

// Get pages
export async function getPages(): Promise<Page[]> {
  return fetchAPI('/pages')
}

// Get a single page by slug
export async function getPage(slug: string): Promise<Page | null> {
  const pages = await fetchAPI(`/pages?slug=${slug}`)
  return pages[0] || null
}

// Get categories
export async function getCategories() {
  return fetchAPI('/categories')
}

// Get posts by category
export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  return fetchAPI(`/posts?categories=${categoryId}&_embed=true`)
} 
