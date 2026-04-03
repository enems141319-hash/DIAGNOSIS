import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'accent' | 'bone' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    fullWidth?: boolean;
  }
>;

const variantClassName: Record<ButtonVariant, string> = {
  accent:
    'bg-accent text-bone shadow-ambient hover:-translate-y-0.5 hover:brightness-105',
  bone: 'bg-bone text-obsidian hover:-translate-y-0.5',
  ghost:
    'bg-white/5 text-bone backdrop-blur-xl ring-1 ring-white/10 hover:bg-white/10',
};

export function getButtonClassName(
  variant: ButtonVariant = 'ghost',
  fullWidth = false,
  disabled = false,
  className = '',
) {
  return [
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200',
    variantClassName[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'cursor-not-allowed opacity-50' : '',
    className,
  ].join(' ');
}

export function Button({
  children,
  variant = 'ghost',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(
        variant,
        fullWidth,
        Boolean(props.disabled),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
