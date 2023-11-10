
import { createClient } from "@/prismicio"
import { CreateClientConfig } from "@prismicio/next"
import { asHTML, asText } from "@prismicio/helpers"
import Head from "next/head"
import Image from "next/image"
import styles from './post.module.scss'
import { GetServerSidePropsContext } from "next"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"



type PostProps = {
  slug: string,
  title: string,
  description: string,
  cover: string,
  updatedAt: string
}

interface Post {
  post: PostProps
}

export default function Post({ post }: Post) {


  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <Image
            quality={100}
            src={post.cover}
            width={720}
            height={410}
            alt={post.title}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII="
          />

          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </article>
      </main>

    </>
  )
}


export const getServerSideProps = async ({ params }: GetServerSidePropsContext<Params>, req: CreateClientConfig) => {
  const prismic = createClient(req)
  const data = await prismic.getByUID('post', params?.slug)

  const post = {
    slug: params?.slug,
    title: asText(data.data.title),
    description: asHTML(data.data.description),
    cover: data.data.cover.url ?? '',
    updatedAt: new Date(data.last_publication_date).toLocaleDateString('pt-BR', {
      day: "2-digit",
      month: 'long',
      year: 'numeric'
    })
  }
  return {
    props: { post }
  }
}
