declare function require(modulePathOrName: string): any;

document.addEventListener('DOMContentLoaded', (e: Event) => {
    require('./app.css') as string;

    document.body.insertAdjacentHTML('afterend', `
        <h1>Hello world</h1>
    `);
});