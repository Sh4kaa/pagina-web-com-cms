import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import '@/styles/global.scss';

const popins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={popins.className}>
      <Component {...pageProps} />;
    </div>
  );
}
