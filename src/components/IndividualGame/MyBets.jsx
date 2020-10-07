import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name MyBets with the name for the new component.
function MyBets(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>Open Bets</h2>
      <p>Your open bets</p>
      <h2>Active Bets</h2>
      <p>Your active bets</p>
      <h2>Create Bet</h2>
    </div>
  );
}

export default connect(mapStoreToProps)(MyBets);
