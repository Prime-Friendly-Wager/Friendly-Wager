import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name History with the name for the new component.
function History(props) {
  
  useEffect( () => {
    props.dispatch({type: 'GET_MY_COMPLETED_BETS'})
  }, [])

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default connect(mapStoreToProps)(History);
