'use client';

import css from './Error.module.css';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Something went wrong</h1>

      <p className={css.message}>
        {error.message}
      </p>

      <button
        onClick={reset}
        aria-label="Reset button"
        className={css.button}
      >
        Try again
      </button>
    </div>
  );
}