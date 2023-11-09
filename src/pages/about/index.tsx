import { GetStaticProps } from "next"

import Head from 'next/head'
import styles from './styles.module.scss'


import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { createClient } from "@/prismicio"
import { asLink, asText } from "@prismicio/helpers"
import Image from "next/image"

type Content = {
  title: string;
  description: string;
  banner: string;
  github: string
  linkedin: string;
}

interface ContentProps {
  content: Content
}

export default function Sobre({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Quem somos? | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>

            <a href={content.linkedin}>
              <FaLinkedin size={40} />
            </a>
            <a href={content.github}>
              <FaGithub size={40} />
            </a>
          </section>

          <Image
            src={content.banner}
            alt="Sobre Sujeito Programador"
            width={500}
            height={500}
          />

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient()

  const response = await prismic.getByType('about')
  const { title, banner, description, github, linkedin } = response.results[0].data
  const content = {
    title: asText(title),
    description: asText(description),
    banner: banner.url,
    github: asLink(github),
    linkedin: asLink(linkedin)
  }

  return {
    props: {
      content
    }
  }
}