import { useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import {
  Accordion,
  GradientButton,
  TableMui,
  Pagination as StyledPagination,
} from "../../../components";
import { AccordionContainer, CardRow } from "../../../components/common";
import Charge from "./charge";

const paginationCustomStyle = {
  "& ul": {
    justifyContent: "center",
    margin: "15px",
    "& .MuiButtonBase-root": {
      width: 30,
      height: 30,
      backgroundColor: "#fff",
      borderRadius: (theme) => theme.shape.borderRadiuses.primary,
    },
    "& .Mui-selected": {
      backgroundColor: (theme) => theme.palette.darkIndigo.main,
      color: "#fff",
    },
  },
};

const Charges = (props) => {
  const { classCharges, setClassCharges } = props;

  const [page, setPage] = useState(1);

  const addChargeRow = () => {
    let newCharges = [...classCharges];
    newCharges.unshift({
      name: "",
      amount: "",
      isMandatory: false,
      payFrequency: "",
    });

    setClassCharges(newCharges);
    setPage(1);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(classCharges.length / 3);

  return (
    <CardRow>
      <AccordionContainer>
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CardRow
              sx={{
                margin: "10px 0",
                width: "100%",
                padding: "0 10px 0 0",
              }}
              onClick={() => {}}
            >
              <Typography>Charges</Typography>
              <GradientButton
                onClick={(e) => {
                  e.stopPropagation();
                  addChargeRow();
                }}
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                <AddIcon />
                Add Charge
              </GradientButton>
            </CardRow>
          </AccordionSummary>
          {classCharges.length ? (
            <AccordionDetails
              sx={{
                padding: 0,
                backgroundColor: "rgba(219, 216, 227, 0.5)",
              }}
            >
              <TableMui>
                <TableHead>
                  <TableRow>
                    <TableCell>Charge Name</TableCell>
                    <TableCell sx={{ width: "50px", marginLeft: "5px" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ width: "50px" }}>Mandatory</TableCell>
                    <TableCell>Pay Frequency</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classCharges.map((item, index) => {
                    const start = (page - 1) * 3;
                    if (index >= start && index <= start + 2) {
                      return (
                        <Charge
                          key={index}
                          data={item}
                          index={index}
                          setChargeData={setClassCharges}
                          charges={classCharges}
                        />
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </TableMui>
              <CardRow
                sx={{
                  justifyContent: "center",
                }}
              >
                <StyledPagination
                  sx={paginationCustomStyle}
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                />
              </CardRow>
            </AccordionDetails>
          ) : null}
        </Accordion>
      </AccordionContainer>
    </CardRow>
  );
};

export default Charges;
