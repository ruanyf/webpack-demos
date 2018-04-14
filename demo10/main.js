require.ensure(['./a'], require => {
    const content = require('./a');
    document.open();
    document.write(`<h1>${content.default}</h1>`);
    document.close();
});