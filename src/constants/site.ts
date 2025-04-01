import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
//   import { faPeakservices } from '@fortawesome/react-fontawesome'


export const site = {
    name: 'Mounatin Goat Garage Doors',
    nameSVG: '/svg/SVG-05.svg',
    nav: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    // { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    ],
    social: [
        {
            href: 'https://peakservices.io',
            label: 'Peak Services',
            icon: '/peakservices.svg',
            type: 'custom',
            },
            {
            href: 'https://facebook.com',
            label: 'Facebook',
            icon: faFacebook,
            color: '#1877F2',
            },
            {
            href: 'https://instagram.com',
            label: 'Instagram',
            icon: faInstagram,
            },
            {
            href: 'https://linkedin.com',
            label: 'LinkedIn',
            icon: faLinkedinIn,
            },
        ],
    pages: {
    about: {
        title: 'Our Mission',
        subtitle: 'We don’t just install doors. We craft entrances.',
        body: `At Mountain Goat Garage Doors, we offer the highest quality of work to our community.
        Keeping your home and valuables safe and secure is our highest priority.`,
    },
    services: {
        title: 'What We Offer',
        items: [
            'Custom Garage Door Design & Manufacturing',
            'Expert Installation for Homes & Businesses',
            'Opener Diagnosis, Repair & Replacement',
            'Quiet Automation & Smart Upgrades',
        ],
    },
    
    gallery: {
        title: 'Recent Work',
    },
    contact: {
        title: 'Let’s Build Something Bold',
        subtitle: 'Reach out to schedule a consultation or request a quote.',
    },
    },
};

