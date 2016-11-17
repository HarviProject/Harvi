/**
 * Created by johan on 11/11/2015.
 */

var validator = require('validator');
var request = require('request');
exports.action = function (data, callback, config) {


    callback({
        type: "tts",
        content: "Plugin meteo "
    })
};

