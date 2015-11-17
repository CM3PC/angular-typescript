'use strict';

var _ = require('lodash')
    , buildConfig = require('./build.config')
    , config = {}
    , gulp = require('gulp')
    , gulpFiles = require('require-dir')('./gulp')
    , path = require('path')
    , $, key;

$ = require('gulp-load-plugins')({
    pattern: [
        'browser-sync',
        'del',
        'gulp-*',
        'karma',
        'main-bower-files',
        'multi-glob',
        'nib',
        'plato',
        'run-sequence',
        'streamqueue',
        'uglify-save-license',
        'wiredep',
        'yargs'
		
    ]
});

_.merge(config, buildConfig);

config.appFiles = path.join(config.appDir, '**/*');
config.appAssets = path.join(config.appDir, 'assets/**/*');
config.appImageFiles = path.join(config.appDir, 'assets/images/**/*');
config.appMarkupFiles = path.join(config.appDir, '**/*.html');
config.appScriptFiles = path.join(config.appDir, '**/*.{js,ts}');
config.appStyleFiles = path.join(config.appDir, '**/*.{css,scss}');
config.buildJsFiles = path.join(config.buildJs, '**/*.js');
config.unitTestFiles = path.join(config.unitTestDir, '**/*_test.{js,ts}');

config.appFavicon = path.join(config.appDir, '*.ico');

config.buildE2eTestsDir = path.join(config.buildTestDir, 'e2e');
config.buildE2eTests = path.join(config.buildE2eTestsDir, '**/*_test.js');
config.buildUnitTestsDir = path.join(config.buildTestDir, config.unitTestDir);
config.buildUnitTestFiles = path.join(config.buildUnitTestsDir, '**/*_test.js');


config.tsProject = $.typescript.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    target: 'ES5'
});

for (key in gulpFiles) {
    gulpFiles[key](gulp, $, config);
}

gulp.task('dev', ['build'], function () {
    gulp.start('browserSync');
    gulp.start('watch');
});

gulp.task('default', ['dev']);
