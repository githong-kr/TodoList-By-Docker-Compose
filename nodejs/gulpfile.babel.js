"use strict";

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import nodemon from 'gulp-nodemon';
import bs from 'browser-sync';
import del from 'del';

const browserSync = bs.create();

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: `${DIR.SRC}/views/static/js/*`,
    CSS: `${DIR.SRC}/views/static/css/*`,
    IMAGES: `${DIR.SRC}/views/static/images/*`,
    TEMPLATES: `${DIR.SRC}/views/templates/*`
};

const DEST = {
    JS: `${DIR.DEST}/views/static/js`,
    CSS: `${DIR.DEST}/views/static/css`,
    IMAGES: `${DIR.DEST}/views/static/images`,
    TEMPLATES: `${DIR.DEST}/views/templates`
}

// minify javascript
gulp.task('js', async () => {
    return gulp.src(SRC.JS, { sourcemaps: true })
            .pipe(uglify())
            .pipe(gulp.dest(DEST.JS));
});

// minify css
gulp.task('css', async () => {
    return gulp.src(SRC.CSS, { sourcemaps: true })
           .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(gulp.dest(DEST.CSS));
});

// minify html
gulp.task('html', async () => {
    return gulp.src(SRC.TEMPLATES, { sourcemaps: true })
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest(DEST.TEMPLATES))
});

// compress images
gulp.task('images', async () => {
    return gulp.src(SRC.IMAGES, { sourcemaps: true })
           .pipe(imagemin())
           .pipe(gulp.dest(DEST.IMAGES));
});

// clean
gulp.task('clean', async () => {
    return del.sync([DIR.DEST]);
});

// file changed logging && restart
gulp.task('watch', () => {

    browserSync.init({
        proxy: 'localhost:4001',
        reloadDelay: 1000,
    });

    // file changed logging
    let watcher = {
        js: gulp.watch(SRC.JS, gulp.series(['js'])),
        css: gulp.watch(SRC.CSS, gulp.series(['css'])),
        html: gulp.watch(SRC.TEMPLATES, gulp.series(['html'])),
        images: gulp.watch(SRC.IMAGES, gulp.series(['images'])),
        src: gulp.watch('./src/**'),
        app: gulp.watch('app.js')
    };

    let changeNotify = event => {
        gutil.log(`File : ${gutil.colors.yellow(event)} was changed`);
        browserSync.reload();
    };

    for(let key in watcher) {
        if(key === 'src' || key === 'app') {
            watcher[key].on('change', changeNotify);
        }
    }

    // restart
    let stream = nodemon({
        script: `app.js`,
        watch: ['app.js', './src/**']
    });

    return stream;
});

gulp.task('build', gulp.series(['clean', 'js', 'css', 'html', 'images']), () => {
    return gutil.log(`Gulp build success`);
})

gulp.task('default', gulp.series(['build', 'watch']), async () => {
    
    return gutil.log('Gulp is running!');
    
});