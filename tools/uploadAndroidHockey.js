const path = require("path");
const getSettings = require("../build/src/core/settings/getSettings").getSettings;
const settings = getSettings();
const hockeyApp = require("gulp-hockeyapp");

const options = {
    id: settings.devOptions.androidHockeyOptions.appId,
    apiToken: settings.devOptions.androidHockeyOptions.apiToken,
    inputFile: path.resolve(path.join("..", "android", "app", "build", "outputs", "apk", "app-release.apk")),
    notify: 0,
    status: 2,
    //teamList: [1234, 5678]
};

hockeyApp.upload(options).then(
    function () {
        console.log("uploaded");
    }
).catch(function (err) {
        console.log("error upload to hockey");
        console.log(err);
        throw err;
    }
);
