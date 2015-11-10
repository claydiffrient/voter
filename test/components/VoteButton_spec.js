/*eslint-env mocha */
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';
import VoteButton from '../../src/components/VoteButton';

describe('VoteButton', () => {

  it('renders out properly', () => {
    const props = {
      votes: 10,
      handleVoteClick () {}
    };

    const renderer = createRenderer();
    renderer.render(
      <VoteButton {...props} />
    );

    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('div');
    expect(result.props.children[0].props.children).to.equal(10);
    expect(result.props.children[1].props.onClick).to.equal(props.handleVoteClick);
  });

});
