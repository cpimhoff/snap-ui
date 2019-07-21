import React from 'react';
import {default as MediaQuery, useMediaQuery} from 'react-responsive';

import {Box, WrapBox} from './Box';
import {unpackBorderRadii} from './util';

export const StackLayout = {
  start: 'start',
  end: 'end',
  centered: 'centered',
  spread: 'spread',
};

export const StackAlign = {
  start: 'start',
  end: 'end',
  centered: 'centered',
  stretched: 'stretched',
  baseline: 'baseline',
};

/**
 * <Stack/> defines a horizontal or veritical series of components.
 *
 * Stacks lay out their children via flexbox, but keep the definitions
 * in code instead of pushing them out to CSS.
 *
 * <Stack/> work seemlessly with <Box/> and <Spacer/>. They can deliver
 * effects like rounding the corners of the stack without worrying about
 * the individual corners of each individual item, or create flexible
 * gaps without fuss.
 *
 * You can use <HStack/> for horizontal arrangements and <VStack/> for
 * vertical ones. <RStack/> is a responsive stack, and will render as an
 * <HStack/> on large displays, and a <VStack/> on smaller displays.
 */
export function Stack({
  children,
  isHorizontal,
  borderRadius,
  layout = StackLayout.start,
  align = StackAlign.stretched,
  wrappedLayout = StackLayout.start,
  wrap = false,
  fill = false,
  width,
  height,
  style,
  ...rest
}) {
  const borderRadii = unpackBorderRadii(borderRadius);
  const childrenCount = React.Children.count(children);
  const boxedChildren = React.Children.map(children, (child, idx) => {
    const childBorderRadii = {};
    if (idx === 0) {
      if (isHorizontal) {
        childBorderRadii.topLeft = borderRadii.borderTopLeftRadius;
        childBorderRadii.bottomLeft = borderRadii.borderBottomLeftRadius;
      } else {
        childBorderRadii.topLeft = borderRadii.borderTopLeftRadius;
        childBorderRadii.topRight = borderRadii.borderTopRightRadius;
      }
    } else if (idx === childrenCount - 1) {
      if (isHorizontal) {
        childBorderRadii.topRight = borderRadii.borderTopRightRadius;
        childBorderRadii.bottomRight = borderRadii.borderBottomRightRadius;
      } else {
        childBorderRadii.bottomLeft = borderRadii.borderBottomLeftRadius;
        childBorderRadii.bottomRight = borderRadii.borderBottomRightRadius;
      }
    }

    return (
      <WrapBox
        borderRadius={childBorderRadii}
        flexGrow={fill && 1}
        children={child}
      />
    );
  });

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        justifyContent: {
          [StackLayout.start]: 'flex-start',
          [StackLayout.end]: 'flex-end',
          [StackLayout.centered]: 'center',
          [StackLayout.spread]: 'space-between',
        }[layout],
        alignContent: {
          [StackLayout.start]: 'flex-start',
          [StackLayout.end]: 'flex-end',
          [StackLayout.centered]: 'center',
          [StackLayout.spread]: 'space-between',
        }[wrappedLayout],
        alignItems: {
          [StackAlign.start]: 'flex-start',
          [StackAlign.end]: 'flex-end',
          [StackAlign.centered]: 'center',
          [StackAlign.stretched]: 'stretch',
          [StackAlign.baseline]: 'baseline',
        }[align],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        maxWidth: width,
        maxHeight: height,
        ...style,
      }}
      borderRadius={borderRadius}
      {...rest}
    >
      {boxedChildren}
    </Box>
  );
}

export const HStack = props => <Stack isHorizontal={true} {...props} />;
export const VStack = props => <Stack isHorizontal={false} {...props} />;
export function RStack({hProps, vProps, breakWidth = 1224, ...props}) {
  const isHorizontallyContrained = useMediaQuery({maxWidth: breakWidth});
  if (isHorizontallyContrained) {
    return <VStack {...vProps} {...props} />;
  } else {
    return <HStack {...hProps} {...props} />;
  }
}
