
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'
import techsImage from '../../public/images/techs.svg'
import type { GetStaticPropsContext } from 'next'
import { createClient } from '@/prismicio'



// import type { Content } from '@prismicio/client'



type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

interface ContentProps {
  content: Content;
}

export default function Home({ content }: ContentProps) {

  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
              <button>
                COMEÇAR AGORA!
              </button>
            </a>
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

          <img src={content.mobileBanner} alt="Conteúdos desenvolvimento de apps" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src={content.webBanner} alt="Conteúdos desenvolvimento de aplicacoes web" />

          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image quality={100} src={techsImage} alt="Tecnologias" />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a href={content.linkAction}>
            <button>ACESSAR TURMA!</button>
          </a>
        </div>


      </main>
    </>
  )
}

export async function getStaticProps({
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData })
  //    ^ Automatically contains references to document types

  const page = await client.getByUID('home', 'title-cabecalho')
  //    ^ Typed as PageDocument

  const content = {
    title: page.data.title[0]?.text,
    titleContent: page.data.sub_title[0]?.text,
    linkAction: page.data.link_action,
    mobileTitle: page.data.mobile,
    mobileContent: page.data.mobile_content,
    mobileBanner: page.data.mobile_banner,
    webTitle: page.data.title_web,
    webContent: page.data.web_content,
    webBanner: page.data.web_banner,
  }
  console.log(content)

  return {
    props: {
      content,
    }

  }
}