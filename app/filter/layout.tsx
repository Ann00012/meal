import css from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: LayoutProps) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>
                {sidebar}
            </aside>
            <div className={css.wrapper}>
                {children}
            </div>
        </div>
    );
}