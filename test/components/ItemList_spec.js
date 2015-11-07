/*eslint-env mocha */
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';
import ItemList from '../../src/components/ItemList';

describe('ItemList', () => {

  it('renders out the items provided to it', () => {
    const itemProps = [{
      id: 0,
      title: 'Test 1',
      votes: 0
    }, {
      id: 1,
      title: 'Test 2',
      votes: 1
    }];

    const renderer = createRenderer();
    renderer.render(
      <ItemList items={itemProps} />
    );

    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('ul');
    expect(result.props.children.length).to.equal(2);
  });

});