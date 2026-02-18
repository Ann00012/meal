import css from './Footer.module.css';

export default function Footer() { 
    return (
        <footer className={css.footer}>
            <p className={css.text }>&copy; 2026 Name of the company. All rights reserved.</p>
        </footer>
    )
}