import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled as Styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Typography from '@mui/material/Typography';
import { exchangeInfo, getPrices, getSymbols } from '../utils/GlobalApi';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Prices from '../components/Prices';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSymbolsHook } from '../utils/useSymbolsHook';
import { styled } from 'styled-components';


const Accordion = Styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = Styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(255, 255, 255, .05)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = Styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(255, 255, 255, .05)',
}));


const ErrorMessage = styled.div`
    color: white;
    display: flex;
    font-size: xxx-large;
    margin: 100px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    align-items: center;
    justify-content: center;
`


const OrdersBookPage = () => {


    const onSuccess = () => {
        console.warn("Successfully fetched the data")
    }
    const onError = () => {
        console.warn(error)
    }

    const navigate = useNavigate();

    const [symboles, setSymbols] = useState<exchangeInfo>();

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { isLoading, isError, data, error } = useSymbolsHook(onSuccess, onError);


    useEffect(() => {
        if (data !== undefined && data !== null) {
            setSymbols(data);
        }
    }, [data])


    if (isError) {
        return <ErrorMessage>{JSON.stringify(error)}</ErrorMessage>
    }

    const RecordsPerPage = 10;
    const startIndex = (currentPage - 1) * RecordsPerPage;
    const totalPages = symboles !== undefined && symboles.symbols.length !== 0 ? Math.ceil(symboles.symbols.length / RecordsPerPage) : 0;
    const endIndex = startIndex + RecordsPerPage;
    const currentRecords = symboles?.symbols?.slice(startIndex, endIndex);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box sx={{ flexGrow: 1, position: 'relative' }}>

            <Button
                variant="contained"
                sx={{ position: 'absolute', right: '0px', zIndex: 1 }}
                onClick={() => navigate("/")}
            >
                LOGOUT
            </Button>

            <div style={{ height: 400, width: '100%', position: 'absolute', marginTop: '6vh' }}>



                {
                    symboles === null || symboles === undefined ? <CircularProgress /> :
                        currentRecords?.map((symbol, index) => {

                            return (
                                <Accordion key={index} expanded={expanded === `panel${symbol.symbol}`} onChange={handleChange(`panel${symbol.symbol}`)}

                                >
                                    <AccordionSummary aria-controls={`${symbol.symbol}-controls`} id={`${symbol.symbol}-header`}>
                                        <Typography>{`Symbol: ${symbol.symbol}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        {
                                            expanded === `panel${symbol.symbol}` ?
                                                <Prices symbol={symbol.symbol} /> : null
                                        }

                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                }

                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="secondary" variant="outlined"
                    sx={{ marginTop: '2vh', marginBottom: '5vh' }}
                />

            </div>
        </Box>
    )
}

export default OrdersBookPage
