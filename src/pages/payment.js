import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import SimpleButton from "../components/simplebutton";

const PaymentBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
}));

export default function Payment() {
  return (
    <Box>
      <PaymentBox>
      <SimpleButton active>
       Button
      </SimpleButton>
      <SimpleButton active>
       Button
      </SimpleButton>
      <SimpleButton active>
       Button
      </SimpleButton>
      <SimpleButton active>
       Button
      </SimpleButton>
      </PaymentBox>
    </Box>
  );
}
