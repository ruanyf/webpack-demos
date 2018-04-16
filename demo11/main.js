import bundle from 'bundle-loader!./a';

bundle(file => {
    document.open();
    document.write(`<h1>${file.default}</h1>`);
    document.close();
});
