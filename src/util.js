export function formatPaddingValue(pad) {
    if (!pad) { return undefined; }
    return `${pad}pt`;
}

export function unpackPadding(paddingProp) {
    if (paddingProp === undefined || paddingProp === null) {
        return {};
    }

    const globalPadding = Number.isFinite(paddingProp) ? paddingProp : undefined;
    return {
        paddingLeft: formatPaddingValue(globalPadding || paddingProp.left),
        paddingRight: formatPaddingValue(globalPadding || paddingProp.right),
        paddingTop: formatPaddingValue(globalPadding || paddingProp.top),
        paddingBottom: formatPaddingValue(globalPadding || paddingProp.bottom),
    };
}


export function unpackBorderRadii(borderRadiusProp) {
    if (borderRadiusProp === undefined || borderRadiusProp === null) {
        return {};
    }

    const globalBorderRadius = Number.isFinite(borderRadiusProp) ? borderRadiusProp : undefined;
    return {
        borderTopLeftRadius: globalBorderRadius || borderRadiusProp.topLeft,
        borderTopRightRadius: globalBorderRadius || borderRadiusProp.topRight,
        borderBottomLeftRadius: globalBorderRadius || borderRadiusProp.bottomLeft,
        borderBottomRightRadius: globalBorderRadius || borderRadiusProp.bottomRight,
    }
}

export function unpackShadow(shadowProp) {
    if (!shadowProp) {
        return undefined;
    }

    const shadowOpacity = Number.isFinite(shadowProp) ? shadowProp : 0.2;
    return `0px 2px 4px 0px rgba(0, 0, 0, ${shadowOpacity})`;
}
