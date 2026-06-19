import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  padding?: string;
  /** Brighter surface + soft shadow. @default false */
  raised?: boolean;
  /** Element/tag to render. @default 'div' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Generic dark card — hairline border, tight radius, surface tint over shadow. */
export function Card(props: CardProps): JSX.Element;
