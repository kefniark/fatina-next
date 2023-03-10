import path from 'path'

export default {
    build: {
        minify: true,
        target: 'esnext',
        outDir: 'dist',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'fatina',
            formats: ['cjs', 'es'],
            fileName: (format) => {
                if (format === 'cjs') return `index.cjs`
                return `index.js`
            }
        }
    },
    test: {
        environment: 'happy-dom',
        coverage: {
            reportsDirectory: './coverage',
            reporter: ['lcov', 'text', 'html']
        }
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src/')
        }
    }
}
