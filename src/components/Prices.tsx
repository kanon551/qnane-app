import React, {  useEffect, useState } from 'react'
import { getPrices } from '../utils/GlobalApi';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

const Prices = ({symbol}: {symbol: string}) => {

    const [priceData, setPriceData] = React.useState<any>(null);
    const [columns, setColumns] = useState<any>([]);


        React.useEffect(() => {
           
            fetchPricesData();
        }, [symbol]);

        const fetchPricesData = async () => {
            const priceResponse = await getPrices(symbol);
            setPriceData(priceResponse);

            if (priceResponse) {
                // Extract keys from the first object in the array to create columns dynamically
                const keys = Object.keys(priceResponse[0]);
                const dynamicColumns = keys.map((key) => ({
                    field: key,
                    headerName: key,
                    flex: 1,
                }));
                setColumns(dynamicColumns);
            }
        };

  return (
    <div>
        {
            priceData === null ? <CircularProgress /> :
            <DataGrid
                style={{ color: 'black' }}
                rows={priceData}
                columns={columns}
                initialState={{
                columns: {
                    columnVisibilityModel: {
                    id: false,
                    },
                },
                pagination: { paginationModel: { pageSize: 5 } },
                }}
            />
        }
           
    </div>
  )
}

export default Prices

