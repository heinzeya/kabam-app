/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      all: {
        src: [
          'index.js',
          'models/**/*.js',
          'routes/**/*.js',
          'public/**/*.js',
          '!public/front/jquery.form.min.js',
          '!public/{bower_components,vendor}/**/*',
          'test/**/*.js'
        ]
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        },
        src: '<%= jshint.all.src %>'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },

    nodemon: {
      dev: {
        options: {
          watchedExtensions: [ 'js', 'toml' ],
          watchedFolders: [ 'index.js', 'config', 'models', 'routes', 'views' ]
        }
      }
    },

    karma: {
      e2e: {
        configFile: 'test/karma-e2e.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    bgShell: {
      server: {
        cmd: 'node index.js',
        execOpts: {
          cwd: __dirname
        },
        bg: true
      }
    },

    wait: {
      waitServer: {
        options: {
          delay: 6000
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('server', ['nodemon:dev']);

  grunt.registerTask('test:e2e', ['bgShell:server', 'wait:waitServer', 'karma:e2e']);

  grunt.registerTask('test', ['test:e2e']);

};
