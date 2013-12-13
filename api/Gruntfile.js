'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodeunit: {
			files: ['test/**/*-test.js']
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	
	// Default task.
	grunt.registerTask('default', ['nodeunit']);
}