import gulp from 'gulp';
import PATH from './path';

const fonts = () => {
	return gulp.src(PATH.src.fonts)
		.pipe(gulp.dest(PATH.dest.fonts));
};

const fontsWatch = () => {
  gulp.watch(PATH.watch.fonts, ['fonts']);
};

export { fonts, fontsWatch };