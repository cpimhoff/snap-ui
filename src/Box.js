import React from 'react';
import PropTypes from 'prop-types';

import {unpackBorderRadii, unpackPadding, unpackShadow} from './util';

export function Box({
    padding,
    children,
    textColor,
    borderWidth,
    borderColor,
    bgColor,
    borderRadius,
    shadow,
    style,
}) {
    const paddings = unpackPadding(padding) || {};
    const borderRadii = unpackBorderRadii(borderRadius) || {};
    const boxShadow = unpackShadow(shadow);

    return <div style={{
        ...paddings,
        color: textColor,
        backgroundColor: bgColor,
        borderStyle: borderWidth && 'solid',
        borderWidth,
        borderColor,
        ...borderRadii,
        boxShadow,
        ...style,
    }}>
        {children}
    </div>
}

Box.propTypes = {
    padding: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    borderRadius: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            topLeft: PropTypes.number,
            topRight: PropTypes.number,
            bottomLeft: PropTypes.number,
            bottomRight: PropTypes.number,
        }),
    ]),
};

// Ensures that the passed in child is wrapped in a Box.
// If the child is already a Box, the passed props are just
// forwarded (not rewrapped).
//
// Use in contexts where you want to render an element as a Box,
// but do not know upfront whether it is a Box or not.
export function WrapBox({children, ...props}) {
    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length != 1) {
        return <Box children={children} {...props} />
    }

    const Child = childrenArray[0];
    if (Child.type) {
        return React.cloneElement(Child, {...props, ...Child.props});
    } else {
        return <Box children={children} {...props} />
    }
}
