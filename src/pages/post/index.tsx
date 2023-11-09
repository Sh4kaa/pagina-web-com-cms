import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import styles from './styles.module.scss'

import { createClient } from '@/prismicio'

// https://png-pixel.com/

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'
import { asText } from '@prismicio/helpers'
import Link from 'next/link'
import Image from 'next/image'
import Loading from '@/components/Loading'

type Post = InferGetStaticPropsType<typeof getStaticProps>


export default function Posts({ posts: postsBlog, totalPages, page }: Post) {
  const [currentPage, setCurrentPage] = useState(page)
  const [posts, setPosts] = useState(postsBlog || [])
  const [isLoading, setIsLoading] = useState(false)

  const navigatePage = async (pageNumber: number) => {
    setIsLoading(true)
    const response = await reqPost(pageNumber)
    if (response.results.length === 0) {
      return
    }
    const getPosts = response.results.map(post => {
      return {
        slug: post.uid,
        title: asText(post.data.title),
        description: post.data.description[0]?.type === 'paragraph' ? post.data.description[0].text : '',
        cover: post.data.cover.url ?? '',
        updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    setCurrentPage(pageNumber)
    setPosts(getPosts)
    setIsLoading(false)
  }

  const reqPost = async (pageNumber: number) => {
    const prismic = createClient()
    const response = await prismic.getByType('post', {
      orderings: [{ field: 'document.last_publication_date', direction: 'desc', }],
      fetch: ['post.title', 'post.description', 'post.cover'],
      pageSize: 1,
      page: pageNumber
    })
    return response
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/post/${post.slug}`}>
              <Image
                src={post.cover}
                alt={post.title}
                width={720}
                height={410}
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII="
              />
              <strong>{post.title}</strong>
              <time>{post.updateAt}</time>
              <p>{post.description}</p>

            </Link>
          ))}

          {/* lógica das passagens de páginas */}
          <div className={styles.buttonNavigate}>
            {currentPage >= 2 && (
              <div>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(currentPage - 1)}>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}
            {currentPage < totalPages && (
              <div>
                <button onClick={() => navigatePage(currentPage + 1)}>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(totalPages)}>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async ({ previewData }: GetStaticPropsContext) => {
  /* Conectando a API */
  const client = createClient({ previewData })
  const post = await client.getByType('post', {
    orderings: [{ field: 'document.last_publication_date', direction: 'desc', }],
    fetch: ['post.title', 'post.description', 'post.cover'],
    pageSize: 1,
  })
  /* Filtrando retorno da API de postagens */
  const posts = post.results.map(post => {
    return {
      slug: post.uid,
      title: asText(post.data.title),
      description: post.data.description[0]?.type === 'paragraph' ? post.data.description[0].text : '',
      cover: post.data.cover.url ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts,
      totalPages: post.total_pages,
      page: post.page
    },
    revalidate: 60 * 2
  }
}