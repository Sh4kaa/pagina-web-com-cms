import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import '@/styles/global.scss'
import Header from '@/components/Header'
import { PrismicProvider } from '@prismicio/react'
import { client } from '@/prismic'

const popins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <div className={popins.className}>
        <Header />
        <Component {...pageProps} />
      </div>
    </PrismicProvider>
  )
}
