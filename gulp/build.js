'use strict';

var _ = require('underscore.string'),
    fs = require('fs'),
    path = require('path'),
    es = require('event-stream'),
    bowerDir = JSON.parse(fs.readFileSync('.bowerrc')).directory + path.sep;

module.exports = function (gulp, $, config) {
    var isProd = $.yargs.argv.stage === 'prod';
  
  
    /**
     * MAINTAINENCE TASKS
     * 
     * 
     * 
     */
  
    // delete build directory
    gulp.task('clean-build', function () {
        return $.del(config.buildDir);
    });

    gulp.task('clean-ts', function () {
        return $.del(config.appDir + '**/*.js');
    });
  
    /**
     * SCRIPT TASKS
     * 
     * 
     * 
     */
  
    //Compile TypeScript
    gulp.task('compile-ts', function () {

        var tsFilter = $.filter(['**/*.ts'], { restore: true }),
            jsFilter = $.filter(['**/*.js'], { restore: true });

        return gulp.src([
                config.appScriptFiles, 
                config.tsDefinitions,
                '!**/*_test.*'
            ])
            .pipe($.sourcemaps.init())
            .pipe(tsFilter)
            .pipe($.typescript(config.tsProject))
            .pipe(tsFilter.restore)
            .pipe(jsFilter)

            .pipe($.if(isProd, $.angularFilesort()))
            .pipe($.if(isProd, $.concat('app.js')))
            .pipe($.if(isProd, $.ngAnnotate()))
            .pipe($.if(isProd, $.uglify()))
            .pipe($.if(isProd, $.rev()))

            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(config.buildJs))
            .pipe(jsFilter.restore);
    });
  
    /**
     * MARKUP AND STYLES
     * 
     * 
     * 
     */
    
    // Move markup over to build
    gulp.task('markup', function () {
        gulp.src(['app/**/*.html'])
            .pipe(gulp.dest(config.buildDir));
    });
  
    //Compile SCSS
    gulp.task('styles', function () {
        gulp.src(config.appStyleFiles)
            .pipe($.sass({
                includePaths: [
                    config.appDir + '/_scss/partials'
                ]}).on('error', $.sass.logError))
            //.pipe($.autoprefixer())
            .pipe(gulp.dest(config.buildDir + 'css'));
    });
    
    /**
     * ASSETS
     * 
     * 
     * 
     */
    
    // move everything in the assets folder over to build directory
    gulp.task('assets', function () {
       gulp.src(config.appAssets)
        .pipe(gulp.dest(config.buildDir + 'assets'));
    });
    
    // optimize images in build directory
    gulp.task('images', function () {
        gulp.src(config.appImageFiles)
            .pipe($.if(isProd, $.imagemin({ progressive: true })))
            .pipe(gulp.dest(config.buildDir + 'assets/images'));
    }); 
    
    // move favicon over
    gulp.task('copyFavicon', function () {
       gulp.src(config.appFavicon)
        .pipe(gulp.dest(config.buildDir));
    });
    
    /**
     * BOWER TASKS
     * 
     * 
     *  
     */

    // inject custom CSS and JavaScript into index.html
    gulp.task('inject', function () {
        var jsFilter = $.filter(['**/*.js'], { restore: true });
        return gulp.src(config.buildDir + 'index.html')
            .pipe($.inject(gulp.src([
                config.buildCss + '**/*',
                config.buildJs + '**/*'
            ])
                .pipe(jsFilter)
                .pipe($.angularFilesort())
                .pipe(jsFilter.restore), {
                    addRootSlash: false,
                    ignorePath: config.buildDir
                })
                )
            .pipe(gulp.dest(config.buildDir));
    });
  
    // copy bower components into build directory
    gulp.task('bowerCopy', function () {
        var cssFilter = $.filter(['**/*.css'], { restore: true }),
            jsFilter = $.filter(['**/*.js'], { restore: true });
        return gulp.src($.mainBowerFiles(), { base: bowerDir })
            .pipe(cssFilter)

            .pipe($.if(isProd, $.modifyCssUrls({
                modify: function (url, filePath) {
                    if (url.indexOf('http') !== 0 && url.indexOf('data:') !== 0) {
                        filePath = path.dirname(filePath) + path.sep;
                        filePath = filePath.substring(filePath.indexOf(bowerDir) + bowerDir.length,
                            filePath.length);
                    }
                    url = path.normalize(filePath + url);
                    url = url.replace(/[/\\]/g, '/');
                    return url;
                }
            })))
            .pipe($.if(isProd, $.concat('vendor.css')))
            .pipe($.if(isProd, $.cssmin()))
            .pipe($.if(isProd, $.rev()))

            .pipe(gulp.dest(config.extDir))
            .pipe(cssFilter.restore)
            .pipe(jsFilter)

            .pipe($.if(isProd, $.concat('vendor.js')))
            .pipe($.if(isProd, $.uglify({
                preserveComments: $.uglifySaveLicense
            })))
            .pipe($.if(isProd, $.rev()))

            .pipe(gulp.dest(config.extDir))
            .pipe(jsFilter.restore);

    });
  
    // copy Bower fonts and images into build directory
    gulp.task('bowerAssets', function () {
        var assetFilter = $.filter(['**/*.{eot,otf,svg,ttf,woff,woff2,gif,jpg,jpeg,png}'], { restore: true });

        return gulp.src(bowerDir + '**/*')
            .pipe(assetFilter)
            .pipe(gulp.dest(config.extDir))
            .pipe(assetFilter.restore);
    })

    gulp.task('bowerInject', function () {

        if (isProd) {
            return gulp.src([config.buildDir + 'index.html'])
                .pipe($.inject(gulp.src([
                    config.extDir + 'vendor*.css',
                    config.extDir + 'vendor*.js'
                ], {
                        read: false
                    }), {
                        starttag: '<!-- bower:{{ext}} -->',
                        endtag: '<!-- endbower -->',
                        addRootSlash: false,
                        ignorePath: config.buildDir
                    }))
                .pipe($.htmlmin({
                    collapseWhitespace: true,
                    removeComments: true
                }))
                .pipe(gulp.dest(config.buildDir));
        } else {

            return gulp.src(config.buildDir + 'index.html')

                .pipe($.wiredep.stream({
                    ignorePath: '../../' + bowerDir.replace(/\\/g, '/'),
                    fileTypes: {
                        html: {
                            replace: {
                                css: function (filePath) {
                                    return '<link rel="stylesheet" href="' + config.extDir.replace(config.buildDir, '') +
                                        filePath + '">';
                                },
                                js: function (filePath) {
                                    return '<script src="' + config.extDir.replace(config.buildDir, '') +
                                        filePath + '"></script>';
                                }
                            }
                        }
                    }
                }))
                .pipe(gulp.dest(config.buildDir));
        }
    });
	
    /****************************************************************************
    *
    *  BUILD TASK
    *
    *****************************************************************************/
    gulp.task('build', function (cb) {
        $.runSequence('clean-build', ['compile-ts', 'markup', 'styles', 'copyFavicon'], ['bowerCopy', 'bowerAssets'], 'assets','images', 'inject', 'bowerInject', cb);
        
    });
};