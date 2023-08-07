const gulp = require( 'gulp' );

let gulpDPZ, ClosureCompiler;

gulp.task(
    'js',
    gulp.series(
        function(){
            gulpDPZ         = gulpDPZ         || require( 'gulp-diamond-princess-zoning' );
            ClosureCompiler = ClosureCompiler || require( 'google-closure-compiler' ).gulp();

            return gulp.src(
                    [
                        './src/js/**/*.js'
                    ]
                ).pipe(
                    gulpDPZ(
                        {
                            packageGlobalArgs : [
                                'undefined',
                                'void 0'
                            ],
                            basePath          : [
                                './src/js/'
                            ]
                        }
                    )
                ).pipe(
                    ClosureCompiler(
                        {
                            externs           : [
                                './src/js-externs/externs.js',
                                './src/js-externs/nodejs/modules.js',
                                './node_modules/google-closure-compiler/contrib/nodejs/globals.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/buffer.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/events.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/crypto.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/fs.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/http.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/net.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/https.js',
                                // './node_modules/google-closure-compiler/contrib/nodejs/path.js'
                            ],
                            define            : [
                                'DEFINE_TYTE__DEBUG=true',
                                'DEFINE_TYTE__EXPORT=true',
                                'DEFINE_TYTE__USE_RENDER_SSR=true',
                                'DEFINE_TYTE__USE_RENDER_DOM=true'
                            ],
                            // compilation_level : 'ADVANCED',
                            // compilation_level : 'WHITESPACE_ONLY',
                            // formatting        : 'PRETTY_PRINT',
                            warning_level     : 'VERBOSE',
                            // language_in       : 'ECMASCRIPT3',
                            // language_out      : 'ECMASCRIPT3',
                            js_output_file    : 'index.js'
                        }
                    )
                ).pipe(
                    gulp.dest( 'dist' )
                );
        }
    )
);
