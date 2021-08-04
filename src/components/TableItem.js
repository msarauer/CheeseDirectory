import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "@material-ui/core";

const TableItem = ({ data }) => {
  return (
    <TableRow key={data.CheeseId}>
      {/* If there is no english name or manufacturer, show the french one */}
      <TableCell component="th" scope="row">
        {data.CheeseNameEn.length > 0 ? data.CheeseNameEn : data.CheeseNameFr}
      </TableCell>
      <TableCell align="right">
        {data.ManufacturerNameEn.length > 0
          ? data.ManufacturerNameEn
          : data.ManufacturerNameFr}
      </TableCell>
      <TableCell align="right">{data.Organic === "1" ? "Yes" : "No"}</TableCell>
      <TableCell align="left">{data.CharacteristicsEn}</TableCell>
      <TableCell align="right">
        <Link href={data.WebSiteEn}>{data.WebSiteEn}</Link>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
