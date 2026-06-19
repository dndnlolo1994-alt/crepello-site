import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
}

/** Dark text input with hairline border and caramel focus state. */
export function Input(props: InputProps): JSX.Element;
