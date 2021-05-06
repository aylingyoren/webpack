const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   };

   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetsWebpackPlugin({
            cssProcessorPluginOptions: {
               preset: ['default', { discardComments: { removeAll: true } }],
             }
         }),
         new TerserWebpackPlugin()
      ];
   }

   return config;
};

const filename = (ext) => isDev? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssLoaders = (extra) => {
   const loaders = [
      {
      loader: MiniCssExtractPlugin.loader,
      options: {
         publicPath: ''
       }
      }, 
      'css-loader'];

   if (extra) {
      loaders.push(extra);
   }
   
   return loaders;
};

const pluginsSet = () => {
   const plugins = [
      new htmlWebpackPlugin ({
         template: './index.html'
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/assets/img/webpack-logo.png'),
               to: path.resolve(__dirname, 'dist')
            }
         ]
      }),
      new MiniCssExtractPlugin({
         filename: filename ('css')
      })
   ];

   return plugins;
};

const babelOptions = (preset) => {
   const options = {
      presets: ['@babel/preset-env',],
      plugins: ['@babel/plugin-proposal-class-properties']
   };

   if(preset) {
      options.presets.push(preset);
   }

   return options;
};

const jsLoaders = () => {
   const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
   }];

   if (isDev) {
      loaders.push('eslint-loader');
   }

   return loaders;
};

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src/assets'),
  entry: {
   main: './index.jsx',
   stat: './statistics.ts'
   },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename ('js'),
  },
  resolve: {
     extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
     alias: {
        '@': path.resolve(__dirname, 'src'),
        '@model': path.resolve(__dirname, 'model'),
        '@css': path.resolve(__dirname, 'css'),
        '@assets': path.resolve(__dirname, 'assets')
     }
  },
  optimization: optimization(),
   devServer: {
     port: 4200
  },
  devtool: isDev ? 'source-map' : false,
  plugins: pluginsSet(),
  module: {
     rules: [
       {
          test: /\.js$/,
          exclude: /node_modules/,
          use: jsLoaders()
        },
       {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')
         }
        },
       {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react')
         }
        },
        {
           test: /\.css$/,
           use: cssLoaders()
        },
         {
            test: /\.less$/,
            use: cssLoaders('less-loader')
         },
         {
            test: /\.s[ac]ss$/,
            use: cssLoaders('sass-loader')
         },
        {
           test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
           use: ['file-loader']
        },
        {
           test: /\.(ttf|woff|woff2|eot)$/,
           use: ['file-loader']
        },
        {
           test: /\.xml$/,
           use: ['xml-loader']
        },
        {
           test: /\.csv$/,
           use: ['csv-loader']
        }
     ]
  }
};