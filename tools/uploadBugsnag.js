const path = require("path");
const upload = require("bugsnag-sourcemaps").upload;
const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");
const fs = require("fs");
const exec = require("child_process").exec;
const getSettings = require("../build/src/core/settings/getSettings").getSettings;
const settings = getSettings();

const log = console.log;
const optionDefinitions = [
    {name: "platform", alias: "p", type: String, description: "ios | android"}
];
const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage([{header: "Options", optionList: optionDefinitions}]);
log(usage);
let minifiedUrl, sourceMap, minifiedFile;
if (options.platform === "ios") {
    minifiedUrl = "main.jsbundle";
}
else if (options.platform === "android") {
    minifiedUrl = "index.android.bundle";
}
else {
    throw new Error(`Incorrect platform - ${options.platform}`);
}

sourceMap = path.resolve(__dirname, `../tmp/index.${options.platform}.map`);
minifiedFile = path.resolve(__dirname, `../tmp/index.${options.platform}.bundle`);

const bundleExePath = "node node_modules/react-native/local-cli/cli.js bundle " +
    `--platform ${options.platform} ` +
    `--entry-file index.js ` +
    `--bundle-output tmp/index.${options.platform}.bundle ` +
    `--sourcemap-output tmp/index.${options.platform}.map ` +
    "--assets-dest tmp/res --dev false --sourcemap-sources-root=build";

const bundlePath = path.resolve(path.join(__dirname, "..", "tmp"));
if (!fs.existsSync(bundlePath)) {
    fs.mkdirSync(bundlePath);
}

exec(bundleExePath, {cwd: path.resolve(path.join(__dirname, ".."))}, (error) => {
    if (error) {
        console.log("error ", error);

        return;
    }

    walk(path.resolve(__dirname, "../build"), (err, files) => {
        const sources = {};
        const basePath = path.resolve(__dirname, "..");
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];
                if (!file.endsWith("js.map")) {
                    sources["*" + file.toString().replace(basePath, "").replace(/\\/g, "/").replace("/build/", "")] = path.resolve(file);
                }
            }
        }

        upload({
            apiKey: settings.bugReportApiKey,
            appVersion: settings.version,
            minifiedUrl: minifiedUrl,
            sourceMap: sourceMap,
            minifiedFile: minifiedFile,
            overwrite: true,

            sources: sources,

        }, function (err) {
            if (err) {
                throw new Error(`Something went wrong! ${err.message}`);
            }
            console.log("Sourcemap was uploaded successfully.");
            deleteFolderRecursive(bundlePath);
        });
    });
});

function deleteFolderRecursive(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach(function (file) {
            const curPath = path.join(directoryPath, "/", file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.join(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
}
