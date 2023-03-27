/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:[
      "imagegenbladedshipe3abe2.blob.core.windows.net",
    ]
  }
}

module.exports = nextConfig
