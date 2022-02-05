export default {
  '@context': 'http://schema.org/',
  '@type': 'WebApplication',
  name: 'Glif Explorer',
  description: 'A Filecoin analytics UI.',
  url: 'https://beta.explorer.glif.io',
  knowsAbout: [
    {
      '@type': 'SoftwareApplication',
      name: 'Filecoin',
      url: 'https://filecoin.io',
      applicationCategory: 'Blockchain network',
      operatingSystem: 'All'
    }
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Glif',
    description: '.',
    url: 'https://apps.glif.io'
  }
}
