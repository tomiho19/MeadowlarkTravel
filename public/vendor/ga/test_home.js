suite('Global Tests', function () {
    test('This page have right title', function () {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO')
    });
});