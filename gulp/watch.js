'use strict';

module.exports = function (gulp, $, config) {
  
  var isProd = $.yargs.argv.stage === 'prod';
  var isProdServer = $.yargs.argv.serve === 'no'
  
  
  gulp.task('browserSync', function () {
    if (isProd && isProdServer)
    {
        console.log('building for deployment - browserSync skipped');
    } else {
        $.browserSync({
          host: config.host,
          open: 'external',
          port: config.port,
          server: {
            baseDir: config.buildDir
          }
        });
    }
  });

  gulp.task('watch', function () {
    if (isProd && isProdServer)
    {
        console.log('building for deployment - watch skipped');
    } else {
        $.browserSync.reload();
        gulp.watch([config.appFiles], ['build', $.browserSync.reload]);
    }
  });
};
