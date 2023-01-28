import path from "path"
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin, container } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import HtmlWebpackPlugin from "html-webpack-plugin"
import ESLintPlugin from "eslint-webpack-plugin"
const deps = require('./package.json').dependencies

const ModuleFederationPlugin = container.ModuleFederationPlugin

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "auto",
  },
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "build/index.html",
    }),
    new HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new ModuleFederationPlugin({
      name: 'AnimeListRemote',
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./AnimeList": "./src/views/AnimeList"
      },
      shared: {
        react: { 
          requiredVersion: deps.react,
          singleton: true,
          eager: true
        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true,
          eager: true
        },
        // react: { eager: true },
      },
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};

export default config