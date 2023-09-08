const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/main.js", // Ваш главный файл приложения
    output: {
        path: path.resolve(__dirname, "dist"), // Папка для сборки
        filename: "bundle.js", // Имя выходного файла
    },
    module: {
        rules: [
            {
                test: /\.vue$/, // Обрабатывать файлы .vue
                loader: "vue-loader",
            },
            {
                test: /\.js$/, // Обрабатывать файлы .js
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // Использовать Babel для JS
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()], // Минификация JS-файлов
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js", // Использовать версию Vue.js для разработки
        },
        extensions: ["*", ".js", ".vue", ".json"],
    },
};
