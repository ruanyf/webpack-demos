module.exports = function renderPage(props) {
  return (
    '<!doctype html public="storage">'
    + '<html>'
    + '<meta charset=utf-8/>'
    + '<title>My First React Router App</title>'
    + '<div id="app">' + props.html + '</div>'
    + '<script src="/' + props.bundlejs + '"></script>'
    + '</html>'
  );
}
