import React from 'react';
import styles from '../styles/Footer.module.css';
import contacts from '../data/contacts';

const Footer = () => {
  return (
    <footer className={ styles.footer } >
      <nav className={ styles.nav }>
      {contacts.map((contact) => (
        <a
          href={ contact.url }
          target="_blank"
          rel="noopener noreferrer"
          key={ contact.alt }
          className={ styles.social_link }
        >
          <img src={ contact.src } alt={ contact.alt } className={ styles.social_icon } />
        </a>
      ))}
      </nav>
      <p>Bruno Minelli | Desenvolvedor Web Frontend&copy;</p>
      <p>Todos os direitos reservados.</p>
    </footer>
  );
}
  
  export default Footer;