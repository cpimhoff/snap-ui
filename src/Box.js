import React from 'react';
import PropTypes from 'prop-types';

import {unpackBorderRadii, unpackPadding, unpackShadow} from './util';

/**
 * <Box/> is a simlpe UI primitive which can be styled.
 * <Box/> accepts all normal CSS style rules as direct props.
 *
 * For example `backgroundColor="red"` can be attached to style
 * the component as `style={{backgroundColor: 'red'}}`.
 *
 * <Box/> also has shorthands for very common funtions. `shadow`,
 * for example, or `inline` to set the display to `inline-block`.
 */
export function Box({
  padding,
  children,
  textColor,
  borderWidth,
  borderColor,
  borderRadius,
  shadow,
  style,
  inline,
  className,
  backgroundColor,
  flexGrow,
  width,
  height,
  ...rest
}) {
  const paddings = unpackPadding(padding);
  const borderRadii = unpackBorderRadii(borderRadius);
  const boxShadow = unpackShadow(shadow);

  return (
    <div
      className={className}
      style={{
        ...paddings,
        color: textColor,
        borderStyle: borderWidth && 'solid',
        borderWidth,
        ...borderRadii,
        boxShadow,
        backgroundColor,
        flexGrow,
        display: inline ? 'inline-block' : 'block',
        width,
        height,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

Box.propTypes = {
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  ]),
  borderWidth: PropTypes.number,
  textColor: PropTypes.string,
  borderRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      topLeft: PropTypes.number,
      topRight: PropTypes.number,
      bottomLeft: PropTypes.number,
      bottomRight: PropTypes.number,
    }),
  ]),
  shadow: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Ensures that the passed in child is wrapped in a Box.
// If the child is already a Box, the passed props are just
// forwarded (not rewrapped).
//
// Use in contexts where you want to render an element as a Box,
// but do not know upfront whether it is a Box or not.
//
// This component should only be needed internally.
export function WrapBox({children, ...props}) {
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length != 1) {
    return <Box children={children} {...props} />;
  }

  const Child = childrenArray[0];
  if (Child.type) {
    return React.cloneElement(Child, {...props, ...Child.props});
  } else {
    return <Box children={children} {...props} />;
  }
}
