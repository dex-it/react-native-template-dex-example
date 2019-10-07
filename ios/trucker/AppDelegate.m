/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "TestConfigurationProvider.h"
#import "SetIpView.h"
#import "LoadingView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
   RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
   RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                       moduleName:@"trucker"
                                                initialProperties:nil];

   LoadingView *loadingView = [[LoadingView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
   if ([TestConfigurationProvider isDebug]) {
     SetIpView *setIpView = [[SetIpView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
     [setIpView setBackground:loadingView];
     rootView.loadingView = setIpView;
   } else {
     rootView.loadingView = loadingView;
   }

   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
   return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  if ([TestConfigurationProvider isAvailable]) {
    return [RCTBundleURLProvider jsBundleURLForBundleRoot:@"index"
                                                       packagerHost:[TestConfigurationProvider testIp]
                                                          enableDev:[TestConfigurationProvider isDevMode]
                                                 enableMinification:NO];
  } else {
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  }
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
