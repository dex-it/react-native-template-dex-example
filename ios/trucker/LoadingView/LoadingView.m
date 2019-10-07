#import "LoadingView.h"
#import "TestConfigurationProvider.h"


@implementation LoadingView {

@private
  UIView *_background;
}

- (id)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
    _background = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] firstObject];
    [self addSubview:_background];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  
  _background.frame = self.frame;
}

@end

