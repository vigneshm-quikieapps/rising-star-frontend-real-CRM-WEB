import { styled } from "@mui/material/styles";

const PopUp = styled("div")(({ theme }) => ({
  position: "absolute",

  borderRadius: "8px",
  boxShadow: "1px 2px 6px grey",
  padding: "10px",
  "& .text-container": {
    position: "relative",
    "& .text": {
      margin: 0,
    },
  },
  "& .text-container::before": {
    content: '""',
    position: "absolute",
    width: "20px",
    height: "20px",
    borderBottom: "0px",
    borderRight: "0px",
    left: "82%",
    top: "-19px",
    marginLeft: "-25px",
    transform: "rotate(45deg)",
    backgroundColor: "white",
    marginBottom: "-40px",
    borderRadius: "4px",
  },
}));

export default function PopOne(props) {
  const { text } = props;
  return (
    <PopUp>
      <div className="text-container">
        <h4 className="text">{text}</h4>
      </div>
    </PopUp>
  );
}
