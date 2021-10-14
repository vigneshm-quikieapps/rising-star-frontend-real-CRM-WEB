import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Typography, Box } from "@mui/material";

const Card = (props) => {
  const { heading, subHeading, children, height } = props;
  return (
    <Box
      sx={{
        width: "880px",
        height: height ? height : "148px",
        margin: "25px 150px 10px 0",
        padding: "10px 10px 20px 20px",
        borderRadius: "20px",
        border: "solid 2px #f2f1f6",
        backgroundColor: "#fff",
      }}
    >
      {heading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              sx={{
                width: "605px",
                height: "38px",
                margin: "10px 193px 6px 0",
                fontFamily: "Manrope",
                fontSize: "28px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "0.2px",
                color: "#000",
              }}
            >
              {heading}
            </Typography>
          </div>
          <Box
            sx={{
              width: "52px",
              height: "48px",
              borderRadius: "12px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0)",
              border: "solid 1px #e9e7f1",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MoreHorizIcon />
          </Box>
        </Box>
      ) : null}

      {subHeading ? (
        <Typography
          sx={{
            //   width: "118px",
            height: "19px",
            margin: "6px 97px 10px 0",
            opacity: "0.5",
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "#000",
          }}
        >
          {subHeading}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
};

export default Card;
