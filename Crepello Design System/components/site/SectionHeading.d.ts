import * as React from 'react';

export interface SectionHeadingProps {
  /** Number for the eyebrow, e.g. "02". */
  num?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  /** @default 'left' */
  align?: 'left' | 'center';
  /** Heading level/tag. @default 'h2' */
  as?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}

/** Numbered eyebrow + serif heading + optional lead — the section header pattern. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
