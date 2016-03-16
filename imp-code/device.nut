// Device Code
#require "Si702x.class.nut:1.0.0"
#require "APDS9007.class.nut:1.0.0"
#require "LPS25H.class.nut:1.0.0"

// 5 Minute reading interval
const READING_INTERVAL = 300;

data <- {};

hardware.i2c89.configure(CLOCK_SPEED_400_KHZ);
local tempHumidSensor = Si702x(hardware.i2c89);

local pressureSensor = LPS25H(hardware.i2c89);
pressureSensor.enable(true);

local lightOutputPin = hardware.pin5;
lightOutputPin.configure(ANALOG_IN);
local lightEnablePin = hardware.pin7;
lightEnablePin.configure(DIGITAL_OUT, 1);
local lightSensor = APDS9007(lightOutputPin, 47000, lightEnablePin);

local led = hardware.pin2;
led.configure(DIGITAL_OUT, 0);

function getReadings() {

    // Flash the LED
    flashLed();

    data.id <- hardware.getdeviceid();
    data.timestamp <- date().time;

    local lux = lightSensor.read();
    data.lux <- lux;

    pressureSensor.read(function(pressure) {
        data.pressure <- pressure;

        tempHumidSensor.read(function(reading) {

            data.temp <- reading.temperature;
            data.humidity <- reading.humidity;

            // Send the data to the agent
            agent.send("reading", data);

            imp.onidle(function() { server.sleepfor(READING_INTERVAL); } );
        });
    });
}

function flashLed() {
    led.write(1);
    imp.sleep(0.5);
    led.write(0);
}

getReadings();