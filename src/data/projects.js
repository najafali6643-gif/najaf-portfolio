import myvoyage from '../assets/image/project-myvoyage.webp'
import lotus from '../assets/image/project-lotus.webp'
import coleman from '../assets/image/project-coleman.webp'
import myria from '../assets/image/project-myria.webp'

export const projects = [
  {
    number: '01',
    title: 'MyVoyageOnline',
    href: 'https://www.myvoyageonline.com/',
    description:
      'Premium bespoke travel-planning website (Webflow) for a French travel expert — client trip showcases, destination guides, service tiers, and a blog, all built for conversion.',
    tags: ['Webflow', 'CMS', 'JavaScript'],
    image: myvoyage,
    imageRight: false,
  },
  {
    number: '02',
    href: 'https://lotusmiamiexperiences.com/',
    title: 'Lotus Miami Experience',
    description:
      'Luxury Miami experience-curation site built with Astro, showcasing bespoke itinerary collections, a booking consultation flow, and a clean, editorial design system.',
    tags: ['Astro', 'Tailwind CSS', 'JavaScript'],
    image: lotus,
    imageRight: true,
  },
  {
    number: '03',
    href: 'https://themrcoleman.com/',
    title: 'Mr. Coleman',
    description:
      'Personal site (WordPress/Bricks) for a fashion producer and event host — built to highlight a 30+ year career, services, and press features with a bold editorial look.',
    tags: ['WordPress', 'Bricks Builder'],
    image: coleman,
    imageRight: false,
  },
  {
    number: '04',
    href: 'https://www.myriamarketing.com/',
    title: 'Myria Marketing',
    description:
      'Boutique email marketing agency site (Framer) for e-commerce brands, built to showcase Klaviyo/Shopify-driven retention campaigns, custom analytics dashboards, and case study results with a bold, conversion-focused layout.',
    tags: ['Framer', 'JavaScript', 'Analytics'],
    image: myria,
    imageRight: true,
  },
]
