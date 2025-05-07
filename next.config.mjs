let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle bcrypt and other native Node.js modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bcrypt: false,
        "node-pre-gyp": false,
        "npm": false,
        "node-gyp": false,
        "mock-aws-s3": false,
        "aws-sdk": false,
        "fs": false,
        "child_process": false,
        "path": false,
        "os": false,
        "util": false,
        "process": false, // Changed from require.resolve
        "stream": false,  // Changed from require.resolve
        "zlib": false,    // Changed from require.resolve
        "crypto": false,  // Changed from require.resolve
        "@mapbox/node-pre-gyp": false,
        "express": false,
        "constants": false,
        "assert": false,
        "buffer": false,
      };
    }
    
    // Add rule to ignore HTML files from node modules
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules/,
      use: 'null-loader',
    });
    
    return config;
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
