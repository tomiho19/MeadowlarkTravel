module.exports = function(grunt){
// Загружаем плагины
    [
        'grunt-cafe-mocha',
        'grunt-exec',
    ].forEach(function(task){
        grunt.loadNpmTasks(task);
    });
// Настраиваем плагины
    var port = grunt.option('port') || 3000;
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
        },
        exec: {
            linkchecker:
                { cmd: 'linkchecker http://localhost:3000' }
        },
    });
// Регистрируем задания
    grunt.registerTask('default', ['cafemocha','exec']);
};