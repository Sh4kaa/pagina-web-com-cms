import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import Image from 'next/image'
import techsImage from '@/../public/images/techs.svg'
import { PrismicRichText, useFirstPrismicDocument } from '@prismicio/react'
import { title } from 'process'



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

export default function Home() {
  const [document] = useFirstPrismicDocument()
  const content: Content = {} as Content
  if (document) {
    const {
      link_action,
      mobile, mobile_banner,
      mobile_content, sub_title,
      title, title_web, web_banner,
      web_content
    } = document.data

    content.title = title[0].text
    content.linkAction = link_action
    content.mobileContent = mobile_content
    content.mobileBanner = mobile_banner
    content.mobileTitle = mobile
    content.webTitle = title_web
    content.webContent = web_content
    content.titleContent = sub_title
    content.webBanner = web_banner
  }








  return (
    <>
      <Head>
        <title>Sujeito | Home</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Olsdfhowser</h1>
            <span>sartgwertwertwertwertwert</span>
            <a href="">
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
            <h2>{content.title}</h2>
            <span>faswertwertwerwer</span>
          </section>

          <img src="" alt="Conteúdos desenvolvimento de apps" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src="" alt="Conteúdos desenvolvimento de aplicacoes web" />

          <section>
            <h2>gwesdrtwertwertewrt</h2>
            <span>sedfserwer</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image quality={100} src={techsImage} alt="Tecnologias" />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a href="">
            <button>ACESSAR TURMA!</button>
          </a>
        </div>
      </main>
    </>
  )
}


// export const getStaticProps: GetStaticProps = async () => {

//   const {
//     title, sub_title, link_action,
//     mobile, mobile_content, mobile_banner,
//     title_web, web_content, web_banner
//   } = response.results[0].data

//   const content = {
//     title: RichText.asText(title),
//     titleContent: RichText.asText(sub_title),
//     linkAction: link_action.url,
//     mobileTitle: RichText.asText(mobile),
//     mobileContent: RichText.asText(mobile_content),
//     mobileBanner: mobile_banner.url,
//     webTitle: RichText.asText(title_web),
//     webContent: RichText.asText(web_content),
//     webBanner: web_banner.url
//   }


//   return {
//     props: {

//     },

//   }
// }
