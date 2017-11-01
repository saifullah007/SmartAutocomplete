module.exports = function (grunt) {

    /**
     * Add configurations
     */

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '/**\n'+
                ' * <%= pkg.name %>\n'+
                ' * @Author <%= pkg.author %>\n'+
                ' */\n',

                separator: '\n\n\n'
            },

            dist: {
                src: ['src/configuration.js','src/dataBuilder.js','src/template.js'],
                dest: 'dist/smart-autocomplete.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/smart-autocomplete.js',
                dest:  'dist/smart-autocomplete.min.js'
            }
        },

        qunit: {
            unit: [
                'test/unit-test/*.html'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['concat', 'uglify', 'qunit']);
};