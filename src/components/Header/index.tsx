import styles from '@/components/Header/styles.module.scss'
import Image from 'next/image'
import logo from '@/../public/images/logo.svg'
import ActiveLink from '../ActiveLink'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src={logo} alt="Sujeito programador Logo" />
        </Link>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            Home
          </ActiveLink>

          <ActiveLink href="/post" activeClassName={styles.active}>
            Conteúdos
          </ActiveLink>

          <ActiveLink href="/about" activeClassName={styles.active}>
            Sobre
          </ActiveLink>
        </nav>
        <a className={styles.readyButton} href="https://github.com/Sh4kaa">
          Começar
        </a>
      </div>
    </header>
  )
}
