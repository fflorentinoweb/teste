module.exports = {
    staticFileGlobs: [
        'wwwroot/**.html',
        'wwwroot/**.js',
        'wwwroot/assets/fonts/*',
        'wwwroot/assets/img/*',
        'wwwroot/assets/icons/*',
        'wwwroot/assets/manifest/*'
    ],
    root: 'wwwroot',
    stripPrefix: 'wwwroot/',
    navigateFallback: '/index.html',
    maximumFileSizeToCacheInBytes: 20971520
};