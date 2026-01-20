interface StructuredDataProps {
  type: 'home' | 'services' | 'about' | 'contact' | 'promotions';
  settings: any;
  pageData?: any; // For services, promotions, etc.
}

export default function StructuredData({ type, settings, pageData }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  // LocalBusiness schema (for homepage and contact)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GasStation",
    "name": settings.site_name || "Shell Gas Station",
    "image": settings.logo || "",
    "description": settings.site_description || "Premium fuel and convenience services",
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": settings.contact_phone,
    "email": settings.contact_email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressLocality": settings.city || "",
      "postalCode": settings.postal_code || "",
      "addressCountry": settings.country || "GR"
    },
    "geo": settings.latitude && settings.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": settings.latitude,
      "longitude": settings.longitude
    } : undefined,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": settings.hours_weekday?.split('-')[0]?.trim() || "06:00",
        "closes": settings.hours_weekday?.split('-')[1]?.trim() || "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": settings.hours_weekend?.split('-')[0]?.trim() || "07:00",
        "closes": settings.hours_weekend?.split('-')[1]?.trim() || "21:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "EUR"
  };

  // Organization schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.site_name || "Shell Gas Station",
    "url": baseUrl,
    "logo": settings.logo || "",
    "sameAs": [
      settings.facebook_url,
      settings.instagram_url,
      settings.twitter_url
    ].filter(Boolean)
  };

  // Breadcrumb schema
  const breadcrumbs: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  if (type !== 'home') {
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": type.charAt(0).toUpperCase() + type.slice(1),
      "item": `${baseUrl}/${type}`
    });
  }

  // Services schema - ItemList of services
  const servicesSchema = pageData?.services ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Our Services",
    "itemListElement": pageData.services.map((service: any, index: number) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "GasStation",
        "name": settings.site_name
      }
    }))
  } : null;

  // Promotions schema - Offer list
  const promotionsSchema = pageData?.promotions ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Current Promotions",
    "itemListElement": pageData.promotions.map((promo: any, index: number) => ({
      "@type": "Offer",
      "position": index + 1,
      "name": promo.title,
      "description": promo.description,
      "validFrom": promo.valid_from,
      "validThrough": promo.valid_until,
      "price": promo.discount_text,
      "offeredBy": {
        "@type": "GasStation",
        "name": settings.site_name
      }
    }))
  } : null;

  // About page schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us",
    "description": pageData?.content || "Learn about our gas station",
    "mainEntity": {
      "@type": "GasStation",
      "name": settings.site_name
    }
  };

  // Build schemas array based on page type
  let schemas: any[] = [];

  switch (type) {
    case 'home':
      schemas = [localBusiness, organization, breadcrumbs];
      break;
    
    case 'services':
      schemas = [organization, breadcrumbs];
      if (servicesSchema) schemas.push(servicesSchema);
      break;
    
    case 'about':
      schemas = [organization, breadcrumbs, aboutPageSchema];
      break;
    
    case 'contact':
      schemas = [localBusiness, organization, breadcrumbs];
      break;
    
    case 'promotions':
      schemas = [organization, breadcrumbs];
      if (promotionsSchema) schemas.push(promotionsSchema);
      break;
    
    default:
      schemas = [organization, breadcrumbs];
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}