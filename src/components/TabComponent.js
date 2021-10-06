import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../styles/global.css";
import theme from "../styles/theme"
import { styled } from "@mui/system";



const MyComponent = styled(Button)(
    ({ theme }) =>


({
    backgroundColor: '#fff', color: '#000',
    border: "1px solid #f2f1f6",
    height: "42px",
    width: "213px",
    "&:focus": {
        backgroundColor: '#f2f1f6', color: '#000',
        height: "42px",
        width: "213px",

    }
})
);


const BasicButtons = ({ btnText }) => {
    return (
        <Stack spacing={5} direction="row">
            <Button

                sx={{ m: 1 }}>
                <MyComponent>
                    {btnText}
                </  MyComponent>
                
            </Button>
        </Stack>
    );
}
export default BasicButtons



