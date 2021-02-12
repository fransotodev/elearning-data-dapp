import React, { Component } from "react";

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
        <table className="table table-bordered" style={{ maxWidth: "none" }}>
          <thead className="">
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.index}>
                {columns.map((column) => (
                  <td key={item.index + column.name}>
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
export default OfferTable;
