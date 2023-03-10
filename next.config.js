const path = require('path');

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid',
]);

module.exports = withTM({
    trailingSlash: true,
    reactStrictMode: false,
    experimental: {
        esmExternals: false,
        jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        BASE_URL: process.env.BASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
        };

        return config;
    },
});