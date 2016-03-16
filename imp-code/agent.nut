#require "Wunderground.class.nut:1.0.0"

// Begin - Settings
const serverUrl = "http://yourhost.com";
const WUNDERGROUND_API_KEY = "xxxxxxxxxx";
const WUNDERGROUND_LOCATION = "NY/Albany";
// End - Settings

dataUrl <- serverUrl + "/api/message";
headers <- { "Content-Type" : "application/json" };

wunderground <- Wunderground(WUNDERGROUND_API_KEY, WUNDERGROUND_LOCATION);

function getWeather(data, callback) {
    local currentTime = date().time;
    local timeDiff = currentTime - data.timestamp;

    // Only get weather if the imp data is fresh, otherwise weather will be outdated
    if (timeDiff <= 300000) {
        wunderground.getConditions(function(err, resp, wx) {
            if (err == null) {
                data.wx <- {};
                data.wx.oat_f <- wx.temp_f;
                data.wx.humidity <- wx.relative_humidity;
                data.wx.pressure <- wx.pressure_mb;
            }
            callback(null, data);
        });
    } else {
        // No weather
        callback(null, data);
    }
}

function postReading(reading) {
    getWeather(reading, function(err, data) {
        local json = http.jsonencode(data);
        server.log(json);
        local request = http.post(dataUrl, headers, json);
        local response = request.sendsync();
    });
}

device.on("reading", postReading);