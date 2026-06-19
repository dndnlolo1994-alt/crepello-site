import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Leading number, e.g. "01". Rendered in caramel with an em-dash. */
  num?: string | number;
  /** Base text color when no number. @default caramel */
  color?: string;
  children?: React.ReactNode;
}

/** Signature tracked-mono eyebrow with optional `01 —` numbering. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
