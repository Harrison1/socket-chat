var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./client.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    path: __dirname + "/js/",
    filename: "bundle.js"
  }
};

// module.exports = {
//     entry: "./entry.js",
//     output: {
//         path: __dirname,
//         filename: "bundle.js"
//     },
//     module: {
//         loaders: [
//             { test: /\.js?$/,
//               exclude: /(node_modules|public)/,
//               loader: 'babel-loader', 
//               query: {
//                       presets: ['react', 'es2015', 'stage-0'],
//                       plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
//               }
//           }
//         ]
//     }
// };





// module.exports = {
//   context: __dirname,
//   entry: "./entry.js",
//   module: {
//     loaders: [
//       {
//         test: /\.js?$/,
//         exclude: /(node_module)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   },
//   output: {
//     path: __dirname,
//     filename: "bundle.js"
//   }
// };
