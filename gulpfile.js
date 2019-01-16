const gulp = require( 'gulp' );
const webpack = require( 'webpack-stream' );


gulp.task( 'clone', () => (
  gulp.src(
    [
      './source/**/*.html',
      './source/**/*.css'
    ],
    { 'base': './source' }
  ).pipe( gulp.dest( './output' ) )
) );


gulp.task( 'js', () => (
  gulp.src( './source/widget/widget.js', { 'base': './source/widget' })
    .pipe( webpack({
      'mode': 'production', // development
      'output': {
        'filename': 'widget.js'
      },
      'module': {
        'rules': [
          {
            'test': /\.css$/,
            'use': 'raw-loader'
          },
          {
            'test': /\.m?js$/,
            'exclude': /(node_modules|bower_components)/,
            'use': {
              'loader': 'babel-loader',
              'options': {
                'presets': [ '@babel/env' ],
                'plugins': [ '@babel/transform-async-to-generator' ]
              }
            }
          }
        ]
      }
    }) )
    .pipe( gulp.dest( './output' ) )
) );


gulp.task( 'default', gulp.parallel( 'js', 'clone' ) );
