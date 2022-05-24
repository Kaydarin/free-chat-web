const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            "@configs": path.resolve(__dirname, 'src/configs'),
            "@store": path.resolve(__dirname, 'src/store'),
            "@pages": path.resolve(__dirname, 'src/pages'),
        }
    },
};
