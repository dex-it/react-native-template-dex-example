const path = require("path");
const replaceInFile = require("./replaceInFile");

prevertBundleInDebugForiOS();
preventRunReactPackageriOS();

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