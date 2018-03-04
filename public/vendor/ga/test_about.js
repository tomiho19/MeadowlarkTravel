suite('Test About page', function () {
    test('page must contain link in contacts page', function () {
        assert($('a[href="/contact"]').length)
    })
});