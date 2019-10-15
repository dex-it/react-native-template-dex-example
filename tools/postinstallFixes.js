const dir = __dirname;
const path = require("path");
const replaceInFile = require("./replaceInFile");

replaceMetroBlackListForNode();
prevertBundleInDebugForiOS();
preventRunReactPackageriOS();

function replaceMetroBlackListForNode() {
    console.log("Replace metro blacklist for node >= 12.11.x");
    console.log("Process version: ", process.version);

    if (process.version.startsWith("v12.1")) {
        const file = path.join(dir, "..", "node_modules", "metro-config", "src", "defaults", "blacklist.js");

        replaceInFile(file,
            "var sharedBlacklist = [\n" +
            "  /node_modules[/\\\\]react[/\\\\]dist[/\\\\].*/,\n" +
            "  /website\\/node_modules\\/.*/,\n" +
            "  /heapCapture\\/bundle\\.js/,\n" +
            "  /.*\\/__tests__\\/.*/\n" +
            "];",
            "var sharedBlacklist = [\n" +
            "  /node_modules[\\/\\\\]react[\\/\\\\]dist[\\/\\\\].*/,\n" +
            "  /website\\/node_modules\\/.*/,\n" +
            "  /heapCapture\\/bundle\\.js/,\n" +
            "  /.*\\/__tests__\\/.*/\n" +
            "];"
        );
    }
}

function preventRunReactPackageriOS() {
    console.log("preventRunReactPackageriOS");
    const file = path.join(__dirname, "..", "node_modules", "react-native", "React", "React.xcodeproj", "project.pbxproj");

    replaceInFile(file, [
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"],
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"]
    ]);
}

function prevertBundleInDebugForiOS() {
    console.log("prevertBundleInDebugForiOS");
    const file = path.join(__dirname, "..", "node_modules", "react-native", "scripts", "react-native-xcode.sh");

    replaceInFile(file, /"\$PLATFORM_NAME" == \*simulator/g, "\"\$PLATFORM_NAME\"")
}
