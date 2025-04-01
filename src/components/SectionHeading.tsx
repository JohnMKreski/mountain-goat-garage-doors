type Props = {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
};

export default function SectionHeading({ title, subtitle, align = 'left' }: Props) {
    const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

    return (
    <div className={`flex flex-col ${alignment} mb-12`}>
        <h2 className="text-3xl md:text-4xl font-light tracking-tighter text-white mb-2">
        {title}
        </h2>
        {subtitle && (
        <p className="text-muted max-w-xl text-base md:text-lg">
            {subtitle}
        </p>
        )}
    </div>
    );
}
