const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Update this path to your entry file
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Include both .ts and .tsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/, // If you are using CSS or TailwindCSS
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Add these extensions for imports
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
