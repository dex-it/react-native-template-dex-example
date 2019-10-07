#import "TestConfigurationProvider.h"

@implementation TestConfigurationProvider {

}

+ (BOOL)isDebug {
#ifdef DEBUG
    BOOL isDebug = true;
#else
    BOOL isDebug = false;
#endif
    return isDebug;
}

NSString* const CUSTOM_IP_KEY = @"CustomPackagerIp";
NSString* const CUSTOM_DEV_MODE_KEY = @"CustomDevModeKey";

+ (NSString *)content {
    NSString *ipPath = [[NSBundle mainBundle] pathForResource:@"customPackagerIp" ofType:@"txt"];
    NSString *customIp = [NSString stringWithContentsOfFile:ipPath encoding:NSUTF8StringEncoding error:nil];

    return customIp;
}

+ (BOOL)isAvailable {
    if ([TestConfigurationProvider isDebug]) {
        NSString *customIp = [[NSUserDefaults standardUserDefaults] stringForKey:CUSTOM_IP_KEY];

        return [customIp length] > 0 || [TestConfigurationProvider content].length > 0;
    } else {
        return NO;
    }
}

+ (NSString *)testIp {
    NSString *customIp = [[NSUserDefaults standardUserDefaults] stringForKey:CUSTOM_IP_KEY];

    if (customIp == nil) {
        customIp = [TestConfigurationProvider content];
    }

    return [[customIp stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]]
            stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]];
}

+ (void)setTestIp:(NSString *)text {
    [[NSUserDefaults standardUserDefaults] setObject:text forKey:CUSTOM_IP_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

+ (BOOL)isDevMode {
    if ([[NSUserDefaults standardUserDefaults] objectForKey:CUSTOM_DEV_MODE_KEY] == nil) {
        return YES;
    } else {
        BOOL devMode = [[NSUserDefaults standardUserDefaults] boolForKey:CUSTOM_DEV_MODE_KEY];

        return devMode;
    }
}

+ (void)setDevMode:(BOOL)on {
    [[NSUserDefaults standardUserDefaults] setBool:on forKey:CUSTOM_DEV_MODE_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
}
@end
