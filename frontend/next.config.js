module.exports = {
    images: {
        domains: ['pbs.twimg.com', 'gateway.pinata.cloud'],
    },
    webpack: {
        configure: {
          module: {
            rules: [
              {
                test: /react-spring/,
                sideEffects: true
              }
            ]
          }
        }
      }
}