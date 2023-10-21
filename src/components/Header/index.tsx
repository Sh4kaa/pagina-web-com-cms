import styles from '@/components/Header/styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/../public/images/logo.svg';
import ActiveLink from '../ActiveLink';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a>
          <Image src={logo} alt="Sujeito programador Logo" />
        </a>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            Home
          </ActiveLink>

          <ActiveLink href="/post" activeClassName={styles.active}>
            Conteúdos
          </ActiveLink>

          <ActiveLink href="/about" activeClassName={styles.active}>
            Quem somos?
          </ActiveLink>
        </nav>
        <a className={styles.readyButton} href="https://github.com/Sh4kaa">
          Começar
        </a>
      </div>
    </header>
  );
}
