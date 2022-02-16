const path = require('path')

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER
} = require('next/constants')

const webpack = (config) => {
  const adjustedConf = { ...config }
  const experiments = config.experiments || {}
  adjustedConf.experiments = { ...experiments, syncWebAssembly: true }

  adjustedConf.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    next: path.resolve('./node_modules/next'),
    'styled-components': path.resolve('./node_modules/styled-components')
  }

  return adjustedConf
}

module.exports = (phase) => {
  return {
    trailingSlash: true,
    webpack,
    env: {
      NEXT_PUBLIC_GRAPH_API_URL:
        process.env.GRAPH_API_URL || 'graph.glif.host/query',
      NEXT_PUBLIC_HOME_HREF:
        process.env.HOME_HREF || 'https://glif.io',
      NEXT_PUBLIC_BLOG_HREF:
        process.env.BLOG_HREF || 'https://glif.io/blog',
      NEXT_PUBLIC_WALLET_HREF:
        process.env.WALLET_HREF || 'https://calibration.wallet.glif.io',
      NEXT_PUBLIC_SAFE_HREF:
        process.env.SAFE_HREF || 'https://calibration.safe.glif.io',
      NEXT_PUBLIC_EXPLORER_HREF:
        process.env.EXPLORER_HREF || 'https://calibration.explorer.glif.io',
      NEXT_PUBLIC_VERIFIER_HREF:
        process.env.VERIFIER_HREF || 'https://calibration.verify.glif.io',
      NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN || '',
      NEXT_PUBLIC_SENTRY_ENV: process.env.SENTRY_ENV || '',

      ...(phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD
        ? {
            // this api is configured to be load balanced across multiple nodes,
            // if a single node gets sick, it will get dropped and not accept requests
            NEXT_PUBLIC_LOTUS_NODE_JSONRPC:
              process.env.LOTUS_NODE_JSONRPC || 'https://api.node.glif.io',
            NEXT_PUBLIC_COIN_TYPE: process.env.COIN_TYPE || 'f', // 461'
            NEXT_PUBLIC_IS_PROD: true
          }
        : {
            NEXT_PUBLIC_LOTUS_NODE_JSONRPC:
              process.env.LOTUS_NODE_JSONRPC ||
              'https://calibration.node.glif.io',
            NEXT_PUBLIC_COIN_TYPE: process.env.COIN_TYPE || 't', // 1'
            NEXT_PUBLIC_IS_PROD: false
          })
    }
  }
}
