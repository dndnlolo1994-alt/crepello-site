import * as React from 'react';

export interface NavLink { label: string; href: string; }

export interface NavBarProps {
  links?: NavLink[];
  /** Current language label shown on the toggle. @default 'EN' */
  lang?: 'EN' | 'AR';
  onToggleLang?: () => void;
  onOrder?: () => void;
  style?: React.CSSProperties;
}

/**
 * Sticky glass navigation with wordmark, links, language toggle, Order button.
 * @startingPoint section="Site" subtitle="Sticky glass site navigation" viewport="1280x72"
 */
export function NavBar(props: NavBarProps): JSX.Element;
