import { useState } from "react";
import { TableRow, TableCell, MenuItem, Typography } from "@mui/material";

import { TextField, DatePicker } from "../../../../components";

const NewTransaction = () => {
  const [date, setDate] = useState(new Date());
  return (
    <TableRow>
      <TableCell>
        <TextField />
      </TableCell>
      <TableCell>
        <TextField select sx={{ width: "120px" }}>
          <MenuItem value="WRITE_OFF">Write off</MenuItem>
          <MenuItem value="WAIVER">Waiver</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <TextField sx={{ width: "120px" }} />
      </TableCell>
      <TableCell>
        <TextField select sx={{ width: "120px" }}>
          <MenuItem value="CASH">Cash</MenuItem>
          <MenuItem value="REC_BANK">Rec Bank</MenuItem>
          <MenuItem value="TOTZ_BANK">Totz Bank</MenuItem>
          <MenuItem value="REC_CREDIT_CARD">Rec Credit Card</MenuItem>
          <MenuItem value="TOTZ_CREDIT_CARD">Totz Credit Card</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <DatePicker
          date={date}
          onChange={(newDate) => setDate(newDate)}
          textfieldProps={{ style: { maxWidth: "150px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          select
          defaultValue="MANUAL"
          sx={{ width: "120px" }}
          //   InputProps={{ readOnly: true }}
          disabled
        >
          <MenuItem value="MANUAL">Manual</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <Typography>N/A</Typography>
      </TableCell>
      <TableCell>
        <Typography>N/A</Typography>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default NewTransaction;
