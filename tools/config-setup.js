const replaceInFile = require("./replaceInFile");
const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");
const writeJsonFile = require("write-json-file");
const loadJsonFile = require("load-json-file");
const path = require("path");
const getSettings = require("../build/src/core/settings/getSettings").getSettings;

const log = console.log;
const optionDefinitions = [
    {name: "dir", alias: "d", type: String, description: "project directory(current dir used if parameter empty)"},
    {name: "environment", alias: "e", type: String, description: "possible values(Development, Staging, Production)"},
    {name: "version", alias: "v", type: String, description: "version"},
    {name: "build", alias: "b", type: Number, description: "build number"}
];
const options = commandLineArgs(optionDefinitions);
const {version, build, environment} = options;
const dir = options.dir != null ? options.dir : __dirname;
const usage = commandLineUsage([{header: "Options", optionList: optionDefinitions}]);
log(usage);
if (environment !== "Development"
    && environment !== "Test"
    && environment !== "Staging"
    && environment !== "Production") {
    log(`incorrect environment value '${environment}'`);
    return;
} else {
    log(`started with environment ${environment}`);
}
const appName = getSettings().appName;

const mobileSettingsPath = path.join(dir, "..", "resources", "settings", "mobileSettings.json");
const gradleFile = path.join(dir, "..", "android", "app", "build.gradle");
const infoPlist = path.join(dir, "..", "ios", appName, "Info.plist");
const fastlaneFile = path.join(dir, "..", "ios", "fastlane", "Appfile");
const iosSettingsFile = path.join(dir, "..", "ios", appName, "Settings.bundle", "Root.plist");
const droidValuesFile = path.join(dir, "..", "android", "app", "src", "main", "res", "values", "strings.xml");

log(`mobileSettings - ${mobileSettingsPath}`);
log(`infoPlist - ${infoPlist}`);
log(`gradleFile - ${gradleFile}`);
log(`fastlaneFile - ${fastlaneFile}`);
log(`ios settings - ${iosSettingsFile}`);
log(`droid strings resources - ${droidValuesFile}`);

run().then(() => console.log("done"));

async function run() {
    await setupMobileSettings();
    await setupInfoPlist();
    await setupGradleFile();
    await setupFastlaneFile();
    await setupIOSSettingsFile();
}

function setupFastlaneFile() {
    const settings = getSettings();
    const newHockeyApiToken = `ENV["HOCKEY_API_TOKEN"] = "${settings.devOptions.iOSHockeyOptions.apiToken}"`;
    const newHockeyAppId = `ENV["HOCKEY_APP_ID"] = "${settings.devOptions.iOSHockeyOptions.appId}"`;

    replaceInFile(fastlaneFile, [
        [/(.*)(ENV\[\"HOCKEY_API_TOKEN\"\] = \"[^"]*\")(.*)/g, `$1${newHockeyApiToken}$3`],
        [/(.*)(ENV\[\"HOCKEY_APP_ID\"\] = \"[^"]*\")(.*)/g, `$1${newHockeyAppId}$3`]
    ]);
    log("successfully write fastlane file");
}

function setupGradleFile() {
    replaceInFile(gradleFile, [
        [/(.*)(versionCode) \d*(.*)/g, `$1$2 ${build}$3`],
        [/(.*)(versionName) ".*"(.*)/g, `$1$2 "${version}"$3`]
    ]);
    log("successfully write gradle file");
}

function setupInfoPlist() {
    replaceInFile(infoPlist, [
        [/(.*)(CFBundleVersion.*\n*\s*\<string>)\d*(.*)/g, `$1$2${build}$3`],
        [/(.*)(CFBundleShortVersionString.*\n*\s*\<string>)\d\.\d\.?\d?\.?\d?\.?\d?(.*)/g, `$1$2${version.replace(/^(.*)\.\d*$/, "$1")}$3`],
    ]);
    log("successfully write infoPlist file");
}

async function setupMobileSettings() {
    const json = await loadJsonFile(mobileSettingsPath);

    json.version = version;
    json.build = build;
    json.environment = environment;
    await writeJsonFile(mobileSettingsPath, json);
    log("successfully write mobileSettings file");
}

function setupIOSSettingsFile() {
    replaceInFile(iosSettingsFile, [
        [/(.*)(\<string\>Environment\<\/string\>.*\n*\r*\n*.*<key>DefaultValue<\/key>.*\n*\r*\n*.*<string>)(.*)(\<\/string\>)(.*)/g,
            `$1$2${environment}$4`
        ],
        [/(.*)(\<string\>Version\<\/string\>.*\n*\r*\n*.*<key>DefaultValue<\/key>.*\n*\r*\n*.*<string>)(.*)(\<\/string\>)(.*)/g,
            `$1$2${version}$4`
        ]
    ]);
    log("successfully write ios settings file");
}