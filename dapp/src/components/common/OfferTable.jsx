import React, { Component } from "react";
import PropTypes from "prop-types";
class OfferTable extends Component {
  renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    } else return item[column.path];
  }
  render() {
    const { columns, data } = this.props;
    return (
      <>
        <table className="table ">
          {/*table-bordered  table-hover*/}
          <thead className="thead-light">
            <tr>
              {columns.map((column) => (
                <th className="text-center" scope="col" key={column.name}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.index}>
                {columns.map((column) => (
                  <td
                    className="text-center"
                    key={item.index + column.name}
                    style={
                      column.name === "Keywords"
                        ? {
                            width: "40%",
                            verticalAlign: "middle",
                          }
                        : { verticalAlign: "middle" }
                    }
                  >
                    {this.renderCell(item, column)}
                  </td>
                ))}
                <td>{item[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
OfferTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default OfferTable;
