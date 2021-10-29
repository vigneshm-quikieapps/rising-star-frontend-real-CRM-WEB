import { MenuItem, TableCell, TableRow } from "@mui/material";
import {
  CheckBox as StyledCheckbox,
  TextField,
  IconButton,
  ImgIcon,
} from "../../components";
import { styled } from "@mui/material/styles";
import deleteIcon from "./../../assets/icons/icon-delete.png";
import { useState } from "react";

const PayFrequncyOptions = [
  {
    name: "Monthly",
  },
  {
    name: "trial",
  },
];

const StyledTextField = styled(TextField)(({ theme }) => ({
  // applied to label of all variants
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    backgroundColor: "#f4f4f4",
    "&::after ,::before": { display: "none" },
    "& .MuiFilledInput-input": {
      "&:focus": { backgroundColor: "transparent" },
    },
  },
}));

const DeleteButton = () => (
  <IconButton sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Charge = (props) => {
  const [chargeName, setChargeName] = useState("");
  const [amount, setAmount] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <TableRow>
      <TableCell>
        <StyledTextField
          value={chargeName}
          sx={{ width: "100%" }}
          placeholder={"Charge Name"}
          onChange={(e) => {
            setChargeName(e.target.value);
          }}
        ></StyledTextField>
      </TableCell>
      <TableCell>
        <StyledTextField
          value={amount}
          sx={{ width: "45%" }}
          placeholder={"Amount"}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></StyledTextField>
      </TableCell>
      <TableCell>
        <StyledCheckbox
          checked={checked}
          onClick={() => {
            setChecked(!checked);
          }}
        />
      </TableCell>
      <TableCell>
        <StyledTextField
          select
          sx={{ width: "100%" }}
          value={"select "}
          onChange={() => {}}
        >
          {PayFrequncyOptions.map((item, index) => {
            return (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        </StyledTextField>
      </TableCell>
      <TableCell>
        <DeleteButton
          onClick={() => {
            console.log("delete clicked");
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default Charge;
