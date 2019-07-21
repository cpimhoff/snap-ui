import React from 'react';
import PropTypes from 'prop-types';

import {unpackPadding} from './util';

function Padding({padding, children}) {
  return (
    <div
      style={{
        ...unpackPadding(padding),
      }}
    >
      {children}
    </div>
  );
}

function Gap({height, width}) {
  return (
    <div
      style={{
        height,
        width,
        display: height ? 'block' : 'inline-block',
      }}
    />
  );
}

function FlexGap() {
  return (
    <div
      style={{
        height: 1,
        width: 1,
        flexGrow: 99,
      }}
    />
  );
}

/**
 * <Spacer/> is a simlpe UI primitive to help specify whitespace as
 * components instead of pushing margin/padding definitions to CSS.
 *
 * <Spacer/> can be used with children to create padding around the
 * children, or used with no children to create margins and gaps.
 *
 * <Spacer/> can be used inside of Stack components with no props
 * to automatically take up as much space as possible.
 */
export function Spacer({
  u = 0,
  h = 0,
  v = 0,
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  children,
}) {
  if (React.Children.count(children) === 0) {
    if (u || h || v || top || bottom || left || right) {
      return <Gap height={u || v || top + bottom} width={u || h || left + right} />;
    } else {
      return <FlexGap />;
    }
  } else {
    return (
      <Padding
        padding={{
          top: u || v || top,
          bottom: u || v || bottom,
          left: u || h || left,
          right: u || h || right,
        }}
      >
        {children}
      </Padding>
    );
  }
}


Spacer.propTypes = {
  u: PropTypes.number,
  h: PropTypes.number,
  v: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  children: PropTypes.node,
}
