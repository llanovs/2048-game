const path = require('path');

const tsRules = {

    test: /\.tsx?$/,
    use: [{
            loader: "ts-loader"
        }]
};

const jsRules = {
    test: /\.js$/,
    use: [{
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        loader: "source-map-loader"
    }]
};

const pixiJsRules = {
    // Pixi expects people to be using Browserify. We're not, but we still can use
    // its brfs module to deal with pixi code using "fs".
    include: path.resolve(__dirname, "node_modules/pixi.js"),
    use: [{
        loader: "transform?brfs"
    }]
};

const cssRules = {
    test: /\.css$/,
    use:
        ["style-loader", "css-loader"]
};

module.exports = {

    mode: 'development',

    entry: "./src/typescript/index.ts",

    output: {
        filename: "bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".tsx", ".ts", ".js"]
    },

    module: {
        rules: [tsRules, jsRules, cssRules]
    },
};