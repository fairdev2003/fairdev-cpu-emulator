module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'fairdev2003',
            name: 'fairdev-cpu-emulator'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }