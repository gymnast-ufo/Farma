'use strict';

import gulp from 'gulp';

import PATH from './gulp/path';
import { fonts, fontsWatch } from './gulp/fonts';
import { images, imagesWatch } from './gulp/images';
import { sassServe, sassBuild, sassWatch } from './gulp/sass';
import { scriptsServe, scriptsBuild, scriptsWatch } from './gulp/scripts';

// Fonts //
gulp.task('fonts', fonts);
gulp.task('fonts:watch', fontsWatch);

// Images //
gulp.task('images', images);
gulp.task('images:watch', imagesWatch);

// Sass //
gulp.task('sass', sassServe);
gulp.task('sass:prod', sassBuild);
gulp.task('sass:watch', sassWatch);

// Scripts //
gulp.task('scripts', scriptsServe);
gulp.task('scripts:prod', scriptsBuild);
gulp.task('scripts:watch', scriptsWatch);

// Default task
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
	'fonts',
	'images',
	'sass:prod',
	'scripts:prod',
]);

// Server tasks with watch
gulp.task('serve', [
	'fonts',
	'images',
	'sass',
	'scripts',
	'fonts:watch',
	'images:watch',
	'sass:watch',
	'scripts:watch'
]);
