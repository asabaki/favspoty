import '../styles/globals.css'
import type { AppProps } from 'next/app'
import withMT from '@material-tailwind/react/utils/withMT'
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
