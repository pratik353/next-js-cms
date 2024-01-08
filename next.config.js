/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com'
            },
            {
                protocol:'https',
                hostname:'plugins-media.makeupar.com'
            }
        ]
    }
}

module.exports = nextConfig
