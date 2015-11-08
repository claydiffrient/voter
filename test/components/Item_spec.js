/*eslint-env mocha */
import React from 'react';
import { createRenderer, isElementOfType } from 'react-addons-test-utils';
import { expect } from 'chai';
import Item from '../../src/components/Item';
import VoteButton from '../../src/components/VoteButton';

describe('Item', () => {

  it('renders out properly', () => {
    const props = {
      id: 1,
      votes: 10,
      title: 'test',
      handleVoteClick () {}
    };

    const renderer = createRenderer();
    renderer.render(
      <Item {...props} />
    );

    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('li');
    expect(result.props.children[0].type).to.equal(VoteButton);
    expect(result.props.children[1].type).to.equal('span');
  });

});
