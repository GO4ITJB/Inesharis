import React from 'react'
import Link from 'next/link'
import { Post } from '@/lib/wordpress'
import { format } from 'date-fns'
import parse from 'html-react-parser'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
            {parse(post.title.rendered)}
          </Link>
        </h3>
        
        <div className="text-gray-600 mb-4 line-clamp-3">
          {parse(post.excerpt.rendered)}
        </div>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
} 
