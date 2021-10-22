import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { Typography, Box } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Output from '../components/output';
import IconButton from '../components/icon-button';
import ImgIcon from '../components/img-icon';
import Accordion from '../components/accordion';
import Status from '../components/status';

import moreIcon from '../assets/icons/icon-more.png';

import getClassDefinition from '../redux/action/classDefinitionAction';

export default function ClassDefinitions() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [businessDetails, setBusinessDetails] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [charges, setCharges] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const definitions = useSelector(state => state.definitions.definition);

    useEffect(() => {
        dispatch(getClassDefinition(id));
    });

    useEffect(() => {
        definitions && setBusinessDetails(definitions.data.business);
        definitions && setEnrollments(definitions.data.enrolmentControls);
        definitions && setCharges(definitions.data.charges);
        definitions && setSchedules(definitions && definitions.data.sessions);
        console.log(definitions);
        //console.log(schedules);
    });

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
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
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '28px',
                                color: '#000000',
                                fontWeight: 'bold',
                                fontFamily: "Manrope",
                                letterSpacing: "normal",
                            }}
                        >
                            {definitions && definitions.data.name}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#888',
                                fontSize: '14px',
                                fontFamily: "Manrope",
                                letterSpacing: "normal",
                            }}
                        >
                            {businessDetails && businessDetails.name}
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
                    {
                        definitions &&
                        <Output
                            title='Class ID'
                            description={definitions.data._id}
                        />
                    }
                    {
                        businessDetails &&
                        <Output
                            title='City/Town'
                            description={businessDetails.city}
                        />
                    }
                    {
                        businessDetails &&
                        <Output
                            title='Post Code'
                            description={businessDetails.postcode}
                        />
                    }
                    {
                        businessDetails &&
                        <Output
                            title='Status'
                            description={businessDetails.status}
                        />
                    }
                </Box>
            </Box>
            <Accordion 
                sx={{
                    width: "100%",
                    marginTop: '5px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Enrollment Controls
                    </Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                border: 'none',
                            }}
                        >
                            {
                                enrollments.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                width: '25%',
                                                padding: '5px'
                                            }}
                                        >
                                            <Output title={item.name} description={item.values.toString()} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                </MuiAccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    width: '100%',
                    marginTop: '5px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Charges
                    </Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    {charges.map((item, index) => {
                        const mandatory = item.mandatory ? 'Yes' : 'No';
                        return (
                            <Box
                                sx={{
                                    backgroundColor: '#f2f1f6',
                                    borderRadius: '10px',
                                    marginTop: '5px',
                                    paddingInline: '5px'
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: '5px'
                                    }}
                                >
                                    <Output title="Charge" description={item.name} variant="header" />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '25%',
                                            padding: '10px'
                                        }}
                                    >
                                        <Output title="Amount" description={`${item.amount.toString()}`} />
                                    </Box>
                                    
                                    <Box
                                        sx={{
                                            width: '25%',
                                            padding: '10px'
                                        }}
                                    >
                                        <Output title="Mandatory" description={mandatory} />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '25%',
                                            padding: '10px'
                                        }}
                                    >
                                        <Output title="Pay Frequency" description={item.payFrequency} />
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </MuiAccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    width: "100%",
                    marginTop: '5px',
                }} 
                elevation={0}
            >
                <MuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Class Schedule
                    </Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                    {
                        schedules && schedules.map((item, index) => {
                            const schedule = [
                                {title: 'Session ID', description: `${item._id}`},
                                {title: 'Start Date', description: `${new Date(item.term.startDate).toLocaleDateString()}`},
                                {title: 'End Date', description: `${new Date(item.term.endDate).toLocaleDateString()}`},
                                {title: 'Trail Session Allowed', description: item.trialAllowed ? 'Yes' : 'No'},
                                {title: 'Session Name', description: `${item.pattern[0].day}, ${new Date(item.pattern[0].startTime).toLocaleTimeString()} to ${new Date(item.pattern[0].endTime).toLocaleTimeString()}`},
                                {title: 'Pattern', description: item.pattern[0].day},
                                {title: 'End Time', description: `${new Date(item.pattern[0].endTime).toLocaleTimeString()}`},
                                {title: 'Coach Name', description: 'Bethany Lafferty'},
                                {title: 'Full Class Capacity', description: `${item.fullcapacity.toString()}`},
                                {title: 'Waitlist Capacity', description: `${item.waitcapacity}`},
                                {title: 'Trail Capacity', description: '10'},
                                {title: 'Facility', description: 'Gym Hall'},
                            ];
                            return(
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
                                        <Output title="Term" description={item.name} variant="header" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {
                                            schedule.map((x, y) => {
                                                return (
                                                    <Box
                                                        sx={{
                                                            width: '25%',
                                                            padding: '10px'
                                                        }}
                                                    >
                                                        <Output title={x.title} description={x.description} />
                                                    </Box>
                                                );
                                            })
                                        }
                                    </Box>
                                </Box>
                            );
                        })
                    }
                </MuiAccordionDetails>
            </Accordion>
        </Box>
    );    
}
