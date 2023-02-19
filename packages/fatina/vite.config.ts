import path from 'path'

export default {
  build: {
    minify: true,
    target: 'esnext',
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'fatina',
      formats: ['cjs','es'],
      fileName: (format) => {
        if (format === 'cjs') return `fatina.cjs`
        return `fatina.js`
      }
    }
  },
  test: {
    environment: "happy-dom",
    coverage: {
      reportsDirectory: './coverage',
      reporter: ['text', 'html']
    }
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/')
    }
  },
};
