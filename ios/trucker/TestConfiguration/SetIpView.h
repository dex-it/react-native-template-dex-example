#ifndef SetIpView_h
#define SetIpView_h

#import <UIKit/UIKit.h>

@interface SetIpView : UIView

@property (strong, nonatomic) UITextField *text;
@property (strong, nonatomic) UIView *background;
@property (strong, nonatomic) UISwitch *devModeView;

- (void) setBackground:(UIView *) view;

@end

#endif /* SetIpView_h */
