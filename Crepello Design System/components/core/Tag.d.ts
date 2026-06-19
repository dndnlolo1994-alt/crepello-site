import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: 'neutral' | 'accent' | 'dessert' | 'savory';
  /** Transparent background, border only. @default false */
  outline?: boolean;
  children?: React.ReactNode;
}

/** Small tracked mono pill — menu tagging (dessert/savory) and meta labels. */
export function Tag(props: TagProps): JSX.Element;
