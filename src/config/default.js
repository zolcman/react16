module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Web Console - Veeam Nutanix Backup',
    titleTemplate: 'Web Console - Veeam Nutanix Backup',
    meta: [
      {
        name: 'description',
        content: 'Veeam Nutanix Backup Web Console',
      },
    ],
  },
};
