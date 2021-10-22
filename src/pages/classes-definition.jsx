import * as React from 'react';

import { Typography, Box, MenuItem, Pagination, Button } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiTypography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Output from '../components/output';
import IconButton from '../components/icon-button';
import ImgIcon from '../components/img-icon';
import Accordion from '../components/accordion';

import moreIcon from '../assets/icons/icon-more.png';

export default function ClassesDefinition() {
    const outputArray = [
        {title: 'Class ID', description: 'DL39020458'},
        {title: 'City/Town', description: 'Glasgow'},
        {title: 'Post Code', description: 'G467TL'},
        {title: 'Status', description: 'Active'}
    ];

    const enrollment=[
        {title: 'Age', description: '1, 2, 4, 5, 16, 17, 18'},
        {title: 'Gender', description: 'Boys/Girls'},
    ]

    const charges = [
        {title: 'Amount', description: '25.00'},
        {title: 'Mandatory', description: 'Yes'},
        {title: 'Pay Frequency', description: 'Monthly'}
    ];

    const schedule = [
        {title: 'Session ID', description: 'K0B0'},
        {title: 'Start Date', description: '02/07/2022'},
        {title: 'End Date', description: '15/08/2022'},
        {title: 'Trail Session Allowed', description: 'No'},
        {title: 'Session Name', description: 'Mon, 9:30 am to 11:30 am'},
        {title: 'Pattern', description: 'Mon, Tue, Fri, Sat, Sun'},
        {title: 'End Time', description: '11:30 am'},
        {title: 'Coach Name', description: 'Bethany Lafferty'},
        {title: 'Full Class Capacity', description: '20'},
        {title: 'Waitlist Capacity', description: '10'},
        {title: 'Trail Capacity', description: '10'},
        {title: 'Facility', description: 'Gym Hall'},
    ];

    return (
        <Box>
            <Box
                sx={{
                    width: '880px',
                    height: '148px',
                    border: '1px solid #f2f1f6',
                    borderRadius: '20px',
                    marginBlock: '5px',
                    padding: '10px 10px 20px 20px',
                    backgroundColor: '#fff'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTopBottom: '5px',
                    }}
                >
                    <Box
                        sx={{
                            //border: '2px solid black',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '28px',
                                color: '#000000',
                                fontWeight: 'bold',
                                fontFamily: "Manrope",
                                letterSpacing: "normal",
                            }}
                        >
                            Pre-School gymnastics (Age: 1-3)
                        </Typography>
                        <Typography
                            sx={{
                                color: '#888',
                                fontSize: '14px',
                                fontFamily: "Manrope",
                                letterSpacing: "normal",
                            }}
                        >
                            Zippy Totz Pre-school Gymnastics
                        </Typography>
                    </Box>
                    <IconButton>
                        <ImgIcon alt="more">
                            {moreIcon}
                        </ImgIcon>
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',    
                        flexDirection: 'row',
                        marginTop: '10px',
                        justifyContent: 'space-between'
                    }}
                >
                    {outputArray.map((item, index) => {
                        return (<Output
                            title={item.title}
                            description={item.description}
                        />);
                    })}
                </Box>
            </Box>
            <Accordion 
                sx={{
                    width: "880px",
                    padding: "10px 0px",
                    marginTop: '10px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <MuiTypography>
                        Enrollment Controls
                    </MuiTypography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {
                                enrollment.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                width: '25%',
                                                padding: '10px'
                                            }}
                                        >
                                            <Output title={item.title} description={item.description} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                </MuiAccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    width: "880px",
                    padding: "10px 0px",
                    marginTop: '10px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <MuiTypography>
                        Charges
                    </MuiTypography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    <Box
                        sx={{
                            backgroundColor: '#f2f1f6',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '10px'
                            }}
                        >
                            <Output title="Charge" description="Class Fee" variant="header" />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {
                                charges.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                width: '25%',
                                                padding: '10px'
                                            }}
                                        >
                                            <Output title={item.title} description={item.description} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    </Box>
                </MuiAccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    width: "880px",
                    padding: "10px 0px",
                    marginTop: '10px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <MuiTypography>
                        Class Schedule
                    </MuiTypography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    <Box
                        sx={{
                            backgroundColor: '#f2f1f6',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '10px'
                            }}
                        >
                            <Output title="Term" description="2022 Summer" variant="header" />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {
                                schedule.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                width: '25%',
                                                padding: '10px'
                                            }}
                                        >
                                            <Output title={item.title} description={item.description} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    </Box>
                </MuiAccordionDetails>
            </Accordion>
        </Box>
    );    
}
