const gulp = require('gulp');
const del = require('del');

const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const paths = {
    allSrcJs: 'src/**/*.js',
    libDir: 'lib',
};

gulp.task('clean', () => {
    return del(paths.libDir);
});

gulp.task('css', function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'styles/**/*.css'
    ])
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.libDir));
});

gulp.task('js', function () {
    return browserify('./src/main.js')
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./lib'))
});

gulp.task('main', ['js', 'css']);


gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);