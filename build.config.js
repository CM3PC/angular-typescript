'use strict';

var outDir = 'build/';

module.exports = {
    host: 'localhost',
    port: 3000,

    // app directories
    appDir: 'app',
    
    // unit test directories
    unitTestDir: 'app',

    // build test dir
    buildTestDir: outDir + 'test/',

    // build directories
	buildRoot: outDir,
    buildDir: outDir + 'app/',
    buildCss: outDir + 'app/css/',
    buildAssets: outDir + 'app/assets/',
    buildImages: outDir + 'app/assets/images/',
    buildJs: outDir + 'app/js/',
    extDir: outDir + 'app/vendor/',
    extCss: outDir + 'app/vendor/css/',
    extFonts: outDir + 'app/vendor/fonts/',
    extJs: outDir + 'app/vendor/js/',
  
    // typescript
    typings: './typings/',
    tsDefinitions: './typings/**/*.ts'
};
