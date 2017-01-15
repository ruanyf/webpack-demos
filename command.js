/**
 * built by slashhuang
 */
var path= require('path');
var exec = require('child_process').exec;
var webpack = require('webpack');
var command = JSON.parse(process.env.npm_config_argv)['original'].pop();
if(command.toString().length==1){
    command ='0'+command; 
};
var configFile = require(`./demo${command}/webpack.config.js`);
configFile.context = path.resolve(process.cwd(),`./demo${command}/`);
configFile.output.path = configFile.context;

console.log(configFile);
webpack(configFile).run(function(){
    console.log('run done ');
});