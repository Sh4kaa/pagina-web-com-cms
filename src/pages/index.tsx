
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import techsImage from '../../public/images/techs.svg'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createClient } from '@/prismicio'
import { asText } from '@prismicio/helpers'
import { asLink } from '@prismicio/client'
import Image from 'next/image'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ content }: PageProps) {

  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>
              {content.titleContent}
            </span>
            {content.linkAction && (
              <a href={content.linkAction}>
                <button>
                  COMEÇAR AGORA!
                </button>
              </a>
            )}
          </section>
          <img
            src="/images/banner-conteudos.png"
            alt="Conteúdos Sujeito Programador"
          />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>
          {content.mobileBanner && (
            <img src={content.mobileBanner} alt="Conteúdos desenvolvimento de apps" />
          )}
        </div>
        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          {content.webBanner && (
            <img src={content.webBanner} alt="Conteúdos desenvolvimento de aplicacoes web" />
          )}
          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>
        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="Tecnologias" quality={100} />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          {content.linkAction && (
            <a href={content.linkAction}>
              <button>ACESSAR TURMA!</button>
            </a>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const client = createClient()

  const page = await client.getByUID('home', 'title-cabecalho')

  const content = {
    title: asText(page.data.title),
    titleContent: asText(page.data.sub_title),
    linkAction: asLink(page.data.link_action),
    mobileTitle: asText(page.data.mobile),
    mobileContent: asText(page.data.mobile_content),
    mobileBanner: page.data.mobile_banner?.url,
    webTitle: asText(page.data.title_web),
    webContent: asText(page.data.web_content),
    webBanner: page.data.web_banner.url,
  }
  return {
    props: {
      content,
    },
    revalidate: 60 * 2

  }
}