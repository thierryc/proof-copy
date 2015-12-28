//
import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

/*
To get your path oepn terminal and enter this command:
> cd ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
> pwd
*/
const pluginsPath = '/Users/thierry/Library/Application Support/com.bohemiancoding.sketch3/Plugins';

gulp.task('sketchplugin', () => {
  return gulp.src('sketchplugin/Contents/Sketch/**/*')
    .pipe(gulp.dest('Proof Copy.sketchplugin/Contents/Sketch'));
});


gulp.task('install', () => {
  return gulp.src('Proof Copy.sketchplugin/**/*', { base: './' })
    .pipe(gulp.dest(pluginsPath));
});

gulp.task('resources', () => {
  return gulp.src([
    'sketchplugin/Contents/Resources/*.*'
  ], {
    dot: true
  }).pipe(gulp.dest('Proof Copy.sketchplugin/Contents/Resources'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'Proof Copy.sketchplugin']));

gulp.task('dev', ['build'],  () => {
  
  gulp.watch([
    'sketchplugin/Contents/Sketch/**/*.js',
    'sketchplugin/Contents/Sketch/**/*.cocoascript',
    'sketchplugin/Contents/Sketch/*.json'
  ],  ['build']);

  gulp.watch('Proof Copy.sketchplugin/Contents/Resources/**/*',  ['build']);
});

gulp.task('build', ['sketchplugin', 'resources', 'install'], () => {
  return gulp.src('Proof Copy.sketchplugin/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
