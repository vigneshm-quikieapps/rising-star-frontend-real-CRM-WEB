import { styled } from "@mui/material/styles";

const tick = "\\2713";

const CheckBoxComponent = styled("div")(({ theme }) => ({
  width: "fit-content",
  display: "flex",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "& .checkBox": {
    display: "none",
    "&:checked + label::after": {
      content: `"${tick}"`,
      display: "flex",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.gradients.diagonal,
    },
    "& + label": {
      zIndex: 3,
      cursor: "pointer",
      paddingLeft: "33px",
      display: "block",
      position: "relative",
      height: "20px",
      lineheight: "1.7em",
      "&::before": {
        zIndex: 2,
        top: "0px",
        left: "2px",
        width: "25px",
        height: "25px",
        background: theme.palette.text.disabled,
        display: "block",
        content: '""',
        position: "absolute",
        borderRadius: "4px",
      },

      "&::after": {
        zIndex: 2,
        top: "2px",
        left: "4px",
        width: "21px",
        height: "21px",
        background: "#fff",
        display: "block",
        content: '""',
        position: "absolute",
        borderRadius: "3px",
      },
    },
  },
  "& .label-text": {
    marginBottom: 15,
  },
}));

export default function CheckBoxField(props) {
  const { label, ...otherProps } = props;
  return (
    <CheckBoxComponent>
      <label class="label-text">{label}</label>
      <input
        type="checkbox"
        id="terms_and_conditions"
        class="checkBox"
        {...otherProps}
      />
      <label for="terms_and_conditions"></label>
    </CheckBoxComponent>
  );
}
