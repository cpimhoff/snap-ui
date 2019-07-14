import React from 'react';

import { unpackPadding } from './util';

export function Padding({ padding, children }) {
    return <div style={{
        ...unpackPadding(padding)
    }}>
        {children}
    </div>;
}

export function Gap({ height, width }) {
    return <div style={{
        height,
        width,
        display: height ? 'block' : 'inline-block',
    }} />;
}

export function FlexGap() {
    return <div style={{
        height: 1,
        width: 1,
        flexGrow: 99,
    }} />;
}

export function Spacer({
    h = 0,
    v = 0,
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    children,
}) {
    if (React.Children.count(children) === 0) {
        if (h || v || top || bottom || left || right) {
            return <Gap
                height={v || (top + bottom)}
                width={h || (left + right)}
            />;
        } else {
            return <FlexGap/>
        }
    } else {
        return <Padding padding={{
            top: (v || top),
            bottom: (v || bottom),
            left: (h || left),
            right: (h || right),
        }}>
            {children}
        </Padding>;
    }
};
