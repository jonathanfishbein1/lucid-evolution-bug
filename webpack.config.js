import path from 'path'
import webpack from 'webpack'
import HtmlWebPackPlugin from "html-webpack-plugin"
const __dirname = path.resolve()


export default (_env, args) => ({
  mode: 'development',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/',
    filename: '[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      util: false
      , path: false
      , fs: false
      , stream: path.resolve(__dirname, 'stream-browserify')
      , crypto: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|webp|eps|mp4|jpeg|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
        ],
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      }
    ]
  },
  optimization: {
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /node:crypto/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }
    ), new HtmlWebPackPlugin({
      title: 'index',
      filename: `index.html`,
      template: `./index.html`,
    }),
    new webpack.ProvidePlugin({ buffer: ['buffer', 'Buffer'] })
  ]
  , experiments: {
    asyncWebAssembly: true,
    outputModule: true,
    topLevelAwait: true,
    layers: true
  }
})
