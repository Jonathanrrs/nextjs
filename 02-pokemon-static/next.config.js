/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* esto es para poder ver imagenes fuera de nuestro dominio */
  images: {
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
