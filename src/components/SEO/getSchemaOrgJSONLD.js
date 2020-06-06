export default ({
  isBlogPost,
  url,
  siteUrl,
  title,
  author,
  image,
  siteTitle,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: siteTitle,
    },
  ]

  const post = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    url,
    name: title,
    alternateName: siteTitle,
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      url: siteUrl,
      name: author,
    },
    mainEntityOfPage: {
      '@type': 'WebSite',
      '@id': siteUrl,
    },
    datePublished,
  }

  if (image) {
    post.image = image
  }

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
              },
            },
          ],
        },
        post,
      ]
    : schemaOrgJSONLD
}
