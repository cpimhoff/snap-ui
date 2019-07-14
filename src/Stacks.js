import React from 'react';
import { default as MediaQuery, useMediaQuery } from 'react-responsive';

import { Box, WrapBox } from './Box';
import { unpackBorderRadii } from './util';

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

function Stack({
    children,
    isHorizontal,
    borderRadius,
    layout = StackLayout.start,
    align = StackAlign.stretched,
    wrappedLayout = StackLayout.start,
    wrap = false,
    ...rest,
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

        return <WrapBox borderRadius={childBorderRadii}>
            {child}
        </WrapBox>
    });

    return <Box style={{
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
    }} borderRadius={borderRadius} {...rest}>
        {boxedChildren}
    </Box>
};

export const HStack = (props) => <Stack isHorizontal={true} {...props} />;
export const VStack = (props) => <Stack isHorizontal={false} {...props} />;
export function RStack({hProps, vProps, breakWidth = 1224, ...props}) {
    const isHorizontallyContrained = useMediaQuery({ maxWidth: breakWidth })
    if (isHorizontallyContrained) {
        return <VStack {...vProps} {...props}/>;
    } else {
        return <HStack {...hProps} {...props}/>;
    }
};
