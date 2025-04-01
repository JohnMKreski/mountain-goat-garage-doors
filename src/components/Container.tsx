type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Container({ children, className = '' }: Props) {
    return (
    <div className={`container px-4 ${className}`}>
        {children}
    </div>
    );
}

