import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const defaultMeta = {
  title: 'Mountain Goat Garage Doors',
  description: 'Quality garage door services based in the Arkansas River Valley, Buena Vista, Colorado. Installations, repairs, and 24/7 support.',
  image: '/logo/jpg/Highres-01.jpg',
  url: 'https://www.mountaingoatgaragedoors.com',
};

export default function SEO({ title, description, image, url }: SEOProps) {
    const meta = {
        title: title || defaultMeta.title,
        description: description || defaultMeta.description,
        image: image || defaultMeta.image,
        url: url || defaultMeta.url,
      };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

    </Head>
  );
}
