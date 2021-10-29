import { MenuItem, TableCell, TableRow } from "@mui/material";
import {
  CheckBox as StyledCheckbox,
  TextField,
  IconButton,
  ImgIcon,
} from "../../components";
import { styled } from "@mui/material/styles";
import deleteIcon from "./../../assets/icons/icon-delete.png";
import { removeItemByIndex } from "../../utils";

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

const DeleteButton = (props) => (
  <IconButton {...props} sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Charge = (props) => {
  const { data, index, setChargeData, charges } = props;

  const handleNameChange = (e) => {
    let newCharge = [...charges];
    newCharge[index] = {
      ...data,
      name: e.target.value,
    };
    setChargeData(newCharge);
  };

  const handleAmountChange = (e) => {
    let newCharge = [...charges];
    newCharge[index] = {
      ...data,
      amount: e.target.value,
    };
    setChargeData(newCharge);
  };

  const handleMandatoryChange = () => {
    let newCharge = [...charges];
    newCharge[index] = {
      ...data,
      isMandatory: !data.isMandatory,
    };
    setChargeData(newCharge);
  };

  const handleFrequencyChange = (e) => {
    let newCharge = [...charges];
    newCharge[index] = {
      ...data,
      payFrequency: e.target.value,
    };
    setChargeData(newCharge);
  };

  const handleDelete = () => {
    let newCharges = removeItemByIndex(charges, index);
    setChargeData(newCharges);
  };

  return (
    <TableRow>
      <TableCell>
        <StyledTextField
          value={data.name}
          sx={{ width: "100%" }}
          placeholder={"Charge Name"}
          onChange={handleNameChange}
        ></StyledTextField>
      </TableCell>

      <TableCell>
        <StyledTextField
          value={data.amount}
          sx={{ width: "45%" }}
          placeholder={"Amount"}
          onChange={handleAmountChange}
        ></StyledTextField>
      </TableCell>

      <TableCell>
        <StyledCheckbox
          checked={data.isMandatory}
          onClick={handleMandatoryChange}
        />
      </TableCell>

      <TableCell>
        <StyledTextField
          select
          sx={{ width: "100%" }}
          value={data.payFrequency}
          onChange={handleFrequencyChange}
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
        <DeleteButton onClick={handleDelete} />
      </TableCell>
    </TableRow>
  );
};

export default Charge;
