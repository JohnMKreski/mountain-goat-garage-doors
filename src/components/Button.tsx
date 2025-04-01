import Link from 'next/link';
import { ComponentProps } from 'react';

type Props = ComponentProps<'a'> & {
href: string;
label: string;
variant?: 'default' | 'outline';
};

export default function Button({ href, label, variant = 'default', ...rest }: Props) {

    const base = 'btn inline-block px-6 py-3 text-sm font-medium uppercase tracking-wide transition';
    const styles =
      variant === 'default'
        ? 'btn-light text-black hover:bg-neutral-300'
        : 'btn-outline-light border border-white text-white hover:bg-white hover:text-black';
    
return (
    <Link
    href={href}
    {...rest}
    className={`${base} ${styles} no-underline hover:no-underline`}
    >
    {label}
    </Link>
);
}

