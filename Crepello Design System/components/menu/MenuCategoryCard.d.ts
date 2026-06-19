import * as React from 'react';

export interface MenuCategoryCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Numbered label, e.g. "01". */
  num: string;
  title: string;
  /** Optional Arabic title shown above. */
  titleAr?: string;
  /** One-line description revealed on hover. */
  desc?: string;
  /** Image URL; falls back to a warm placeholder. */
  image?: string;
  href?: string;
  /** Accent for number + CTA. @default 'neutral' */
  tone?: 'neutral' | 'dessert' | 'savory';
}

/**
 * Numbered menu-category tile with image-zoom + description reveal on hover.
 * @startingPoint section="Menu" subtitle="Numbered category tile, hover-zoom + reveal" viewport="340x453"
 */
export function MenuCategoryCard(props: MenuCategoryCardProps): JSX.Element;
