import path from 'path'

export default {
  build: {
    minify: false,
    target: 'esnext',
    outDir: './dist'
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/')
    }
  },
};
