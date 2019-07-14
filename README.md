# snap-ui

Snap UI provides basic UI primitives for wrapping and laying out content,
keeping as much of the definitions as possible inside of code, instead
of pushing them to CSS.

# Install
```
yarn add snap-ui
```

# Components
## <Box/>
<Box/> is a simlpe UI primitive which can be styled.
<Box/> accepts all normal CSS style rules as direct props.

For example `backgroundColor="red"` can be attached to style
the component as `style={{backgroundColor: 'red'}}`.

<Box/> also has shorthands for very common funtions. `shadow`,
for example, or `inline` to set the display to `inline-block`.

## <Spacer/>
`<Spacer/>` is a simlpe UI primitive to help specify whitespace as
components instead of pushing margin/padding definitions to CSS.

`<Spacer/>` can be used with children to create padding around the
children, or used with no children to create margins and gaps.

`<Spacer/>` can be used inside of Stack components with no props
to automatically take up as much space as possible.

## <Stack/>
`<Stack/>` defines a horizontal or veritical series of components.
Stacks lay out their children via flexbox, but keep the definitions
in code instead of pushing them out to CSS.

`<Stack/>` work seemlessly with `<Box/>` and `<Spacer/>`. They can deliver
effects like rounding the corners of the stack without worrying about
the individual corners of each individual item, or create flexible
gaps without fuss.

You can use `<HStack/>` for horizontal arrangements and `<VStack/>` for
vertical ones. `<RStack/>` is a responsive stack, and will render as an
`<HStack/>` on large displays, and a `<VStack/>` on smaller displays.
