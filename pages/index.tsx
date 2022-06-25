import { Button } from '@material-tailwind/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

type Props = {
  name: string;
}
const Home: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>FavSpoty</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to FavSpoty!
        </h1>
        <div className="flex w-max gap-4 mt-4">
          <Link href={'/api/login'}><Button variant="filled">Sign In to Spotify</Button></Link>
        </div>
      </main>
    </div>
  )
}

export default Home
