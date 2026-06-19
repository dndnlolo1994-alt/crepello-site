import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary = caramel fill (one per view). @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Renders as an anchor when set. */
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Crepello action button — caramel primary, hairline secondary, bare ghost.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost actions" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
