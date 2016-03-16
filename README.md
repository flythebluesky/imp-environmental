# electric-imp-environmentals
A demo project to collect, store and chart environmental data from an Electric Imp device using Node.js, Angular and MongoDB.

# Requirements
- An <a href="https://electricimp.com/docs/gettingstarted/devkits/">Electric Imp dev kit</a> with an <a href="https://electricimp.com/docs/tails/">Environmental Tail</a>
- Node.js environment with a MongoDB database.
- Knowledge of Javascript/Node.js environments

# Server Setup

The server must be publicly accessible.

1. npm update
2. bower update
3. node server.js

# Device Setup
1. Login at <a href="https://ide.electricimp.com">https://ide.electricimp.com</a>
2. Register your Electric Imp device.
3. Install [agent.nut](imp-code/agent.nut) and [device.nut](imp-code/device.nut).
4. Update [agent.nut](imp-code/agent.nut) for your environment.

<pre>
// Begin - Settings
const serverUrl = "http://yourhost.com";
const WUNDERGROUND_API_KEY = "xxxxxxxxxx";
const WUNDERGROUND_LOCATION = "NY/Albany";
// End - Settings
</pre>

