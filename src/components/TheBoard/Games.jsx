import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function SimpleTable(props) {

  //using hook to dispatch on componentDidMount
  useEffect(() => {
    props.dispatch({ type: 'FETCH_GAMES' })
  }, [])

  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Game</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Spread</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">Game Test</TableCell>
              <TableCell align="right">Time Test</TableCell>
              <TableCell align="right">Spread Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default connect(mapStoreToProps)(SimpleTable);