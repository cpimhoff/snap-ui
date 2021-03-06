import React, {Component} from 'react';
import {render} from 'react-dom';

import {
  HStack,
  VStack,
  RStack,
  StackAlign,
  StackLayout,
  Box,
  Spacer,
} from '../../src';

const SimpleBox = props => (
  <Box padding={10} textColor={props.backgroundColor && 'white'} {...props} />
);

class Demo extends Component {
  render() {
    return (
      <Box style={{fontFamily: "sans-serif"}}>
        <h1>snap-ui Demo</h1>
        <h2>Boxes</h2>
        <Box>This is a box primitive with no style.</Box>

        <SimpleBox borderWidth={1} borderColor="blue" onClick={() => alert('Ah!')}>
          This is a box primitive with some simple padding and a border. It also alerts on click!
        </SimpleBox>

        <Spacer v={10}>
          <SimpleBox padding={10} borderRadius={10} shadow>
            This is a box primitive getting a little fancier with a shadow and
            all
          </SimpleBox>
        </Spacer>

        <h2>Stacks</h2>
        <HStack borderRadius={3}>
          <SimpleBox backgroundColor="blue">Blue</SimpleBox>
          <SimpleBox backgroundColor="red">Red</SimpleBox>
          <SimpleBox backgroundColor="green">Green</SimpleBox>
        </HStack>

        <Spacer v={10} />

        <VStack borderRadius={3}>
          <SimpleBox backgroundColor="blue">Blue</SimpleBox>
          <SimpleBox backgroundColor="red">Red</SimpleBox>
          <SimpleBox backgroundColor="green">Green</SimpleBox>
        </VStack>

        <Spacer v={10} />

        <RStack borderRadius={3} fill>
          <SimpleBox backgroundColor="blue">This is a responsive stack</SimpleBox>
          <SimpleBox backgroundColor="red">Resize the screen, it will break</SimpleBox>
          <SimpleBox backgroundColor="green">
            into a vertical layout on mobile
          </SimpleBox>
        </RStack>

        <h2>Spacers</h2>
        <Box borderWidth={1}>
          <Spacer h={20} v={10}>
            This is a spacer. It adds padding...
          </Spacer>
        </Box>
        <Spacer v={20} />
        <Spacer left={10} right={250}>
          <Box borderWidth={1}>
            Now the spacer is being used to add margin...
          </Box>
        </Spacer>

        <h2>Combining them to build stuff!</h2>
        <h3>Centered Cards</h3>
        <HStack
          layout={StackLayout.centered}
          align={StackAlign.baseline}
          backgroundColor="lightgreen"
          padding={10}
        >
          <Box padding={5} borderRadius={5} backgroundColor="white" shadow>
            Centered
          </Box>
          <Box padding={10} borderRadius={5} backgroundColor="white" shadow>
            Centered
          </Box>
          <Spacer h={30} />
          <Box padding={15} borderRadius={5} backgroundColor="white" shadow>
            Centered
          </Box>
        </HStack>

        <h3>Navigation</h3>
        <RStack backgroundColor="lightblue">
          <SimpleBox>App.com</SimpleBox>
          <Spacer />
          <SimpleBox>About Us</SimpleBox>
          <SimpleBox>Pricing</SimpleBox>
          <SimpleBox>Overview</SimpleBox>
          <SimpleBox>Log In</SimpleBox>
        </RStack>

        <h3>Dropdown</h3>
        <VStack>
          <Box padding={3} borderWidth={1} borderRadius={3} width={200}>
            Select a country...
          </Box>
          <VStack
            backgroundColor="lightgray"
            borderRadius={3}
            borderWidth={1}
            width={200}
            padding={3}
          >
            <Box>USA</Box>
            <Box>Brazil</Box>
            <Box>Canada</Box>
          </VStack>
        </VStack>
      </Box>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
