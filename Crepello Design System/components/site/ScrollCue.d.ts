import * as React from 'react';

export interface ScrollCueProps {
  /** Vertical label text. @default 'Scroll' */
  label?: string;
  style?: React.CSSProperties;
}

/** Subtle hero scroll indicator — vertical label + slow caramel drift line. */
export function ScrollCue(props: ScrollCueProps): JSX.Element;
