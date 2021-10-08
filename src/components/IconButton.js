import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../styles/global.css";
import theme from "../styles/theme"
import { styled } from "@mui/system";




const MyComponent = styled(Button)(
    ({ theme }) =>


({
    backgroundColor: '#ffff', color: '#000',
    border: "1px solid #e9e7f1",
    height: "48px",
    width: "48px",
    padding: "12px",
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "&:focus": {
        backgroundColor: '#f2f1f6', color: '#000',
        height: "48px",
        width: "48px",

    }
})
);


const IconButton = (props) => {
    const {label, ...otherProps}=props
    return (
        <Stack spacing={5} direction="row">
            <Button
                {...otherProps}
                sx={{ m: 1 }}>
                <MyComponent>
                    {label}
                </  MyComponent>
                
            </Button>
        </Stack>
    );
}
export default IconButton



