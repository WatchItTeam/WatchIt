import React from "react";
import "../../css/Loading/LoadingTableList.scss";

function LoadingTableList() {
  const tableRows = [];
  const numberOfRows = 4;

  for (let i = 0; i < numberOfRows; i++) {
    tableRows.push((
      <tr key={i} className="loading-table-list-row">
        <td className="poster-name">
          <div className="poster" />
          <div className="long-text" />
        </td>
        <td><div className="short-text" /></td>
        <td><div className="short-text" /></td>
        <td><div className="long-text" /></td>
        <td><div className="long-text" /></td>
      </tr>
    ));
  }

  return tableRows;
}

export default LoadingTableList;
