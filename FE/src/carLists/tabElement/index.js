import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from '@material-ui/core/Chip';

import * as helpers from './helpers'

import EnhancedTableHead from './enhancedTableHead'


class TabElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: "asc",
            orderBy: "id",
            selected: [],
            data: helpers.createData(props.type,props.data),
            page: 0,
            rowsPerPage: 10
          };
    }


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, type } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const rowsInfo = helpers.generateRows(type)
    
    return (
      <Paper className={classes.root}>
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
                carListType={type}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
            />
            <TableBody>
              {helpers.stableSort(data, helpers.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(dataElement => {
                  const isSelected = this.isSelected(dataElement.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, dataElement.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={dataElement.id}
                      selected={isSelected}
                    >
                    <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                    </TableCell>
                    {
                        rowsInfo.map(field=>{
                            let fieldName = field.id
                            if(fieldName==="id"){
                                return(
                                <TableCell component="th" scope="row" padding="none">
                                    {dataElement[fieldName]}
                                </TableCell>
                                )
                            }
                            if (field.chirp){
                                return(
                                    <TableCell >
                                    <Chip label={dataElement[fieldName]} 
                                      className={classes.chip} 
                                      color={dataElement[fieldName]==="ACTIVE" || dataElement[fieldName]==="GOOD" ||  dataElement[fieldName]==="mytaxi"?"primary":"secondary"}
                                      />
                                  </TableCell>
                                )
                            }
                            if(fieldName==="confort"){
                                return <TableCell numeric={field.numeric}>{helpers.parseConfort(dataElement[fieldName])}</TableCell>
                            }
                            return(<TableCell numeric={field.numeric}>{dataElement[fieldName]}</TableCell>)
                        })
                    }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default TabElement;
