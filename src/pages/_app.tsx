import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import '@/styles/global.scss'
import Header from '@/components/Header'


const popins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (

    <div className={popins.className}>
      <Header />
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </div>

  )
}
