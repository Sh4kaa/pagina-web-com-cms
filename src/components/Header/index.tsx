import React from 'react';
import styles from '@/components/Header/styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/../public/images/logo.svg';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a>
          <Image src={logo} alt="Sujeito programador Logo" />
        </a>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/post">Conteúdos</Link>
          <Link href="/about">Quem somos?</Link>
        </nav>
        <a className={styles.readyButton} href="https://github.com/Sh4kaa">
          Começar
        </a>
      </div>
    </header>
  );
}
