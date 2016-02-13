var request = require('request'),
    Edges = require('./Edges.js'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

var search_filters = {
    "locations": "",
    "diseases": "",
    "sources": "",
    "species": "",
    "category": ["1", "2", "29"],
    "vaccines": "",
    "time_interval": "1 week",
    "zoom_lat": "42.4033472",
    "zoom_lon": "-71.1138393",
    "zoom_level": 7,
    "displayapi": null,
    "heatscore": 1,
    "partner": "hm",
    "default_country": ["106"]
}

var storedData = []
request({
    method: 'POST',
    url: "http://www.healthmap.org/getAlerts.php",
    dataType: 'json',
    data: search_filters
}, function(err, resp, jsonData) {
    JsonData = JSON.parse(jsonData);
    for (var l = 0; l < JsonData.markers.length; ++l) {
        var k = JsonData.markers[l].label.split(',')
        var q = k.map(function(item) {
            return {
                lat: JsonData.markers[l].lat,
                lon: JsonData.markers[l].lon,
                label: item
            }
            console.log(q);
        });
        storedData.push(q[0])
    }
});
//for (var i = 0; i < str)