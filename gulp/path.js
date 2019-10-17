import { scriptAlias } from './alias';

const PATH = {
  watch: {
    fonts: `src/fonts/**/*.*`,
    images: `src/img/**/*.*`,
  	sass: `src/css/**/*.sass`,
    scripts: `src/js/**/*.js`
  },
  src: {
    fonts: `src/fonts/**/*.*`,
    images: `src/img/**/*.*`,
  	sass: `src/css/**/index.sass`,
    scripts: scriptAlias.map(name => `src/js/${name}`),
  },
  dest: {
    fonts: `build/fonts/`,
    images: `build/img/`,
  	sass: `build/css/`,
    scripts: `build/js/`
  }
};

export default PATH;