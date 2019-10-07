#import <Foundation/Foundation.h>


@interface TestConfigurationProvider : NSObject

+ (BOOL) isDebug;

+ (BOOL) isAvailable;

+ (NSString*) testIp;

+ (void)setTestIp:(NSString *)field;

+ (BOOL)isDevMode;

+ (void)setDevMode:(BOOL)on;
@end
