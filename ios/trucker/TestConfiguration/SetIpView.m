#import "SetIpView.h"
#import "TestConfigurationProvider.h"


@implementation SetIpView

@synthesize text = _text;
@synthesize background = _background;
@synthesize devModeView = _devModeView;


- (id)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        _background = nil;
        _text = [[UITextField alloc] init];
        _text.text = [TestConfigurationProvider testIp];
        [_text addTarget:self action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
        [_text setKeyboardType:UIKeyboardTypeNumbersAndPunctuation];
        _devModeView = [[UISwitch alloc] init];
        [_devModeView setOn:[TestConfigurationProvider isDevMode] animated:NO];
        [_devModeView addTarget:self action:@selector(switchDidChange:) forControlEvents:UIControlEventValueChanged];
        [self addSubview:_text];
        [self addSubview:_devModeView];
    }
    return self;
}

- (void)setBackground:(UIView *)view {
    if (_background != nil) {
        [_background removeFromSuperview];
    }
    _background = view;
    [self addSubview:_background];
    [self sendSubviewToBack:_background];
}

- (void)switchDidChange:(UISwitch *)sender{
    [TestConfigurationProvider setDevMode:sender.isOn];
}

- (void)textFieldDidChange:(UITextField *)textField {
    [TestConfigurationProvider setTestIp:textField.text];
}

- (void)layoutSubviews {
    [super layoutSubviews];

    CGFloat start = 60;
    CGFloat height = 50;
    _text.frame = CGRectMake(20, start, self.bounds.size.width - 20, height);
    _devModeView.frame = CGRectMake(20, start + height, self.bounds.size.width - 20, height);
    if (_background != nil) {
        _background.frame = [self bounds];
    }
}

@end
