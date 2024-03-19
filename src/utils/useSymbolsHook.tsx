import { useQuery } from "react-query";
import axios from 'axios';
import { getSymbols } from "./GlobalApi";


const obtainSymbols = async () => {

    try {
        const symbolResponse = await getSymbols();
        console.log("Fetched from hook")
        return symbolResponse;
    } catch (error) {
        console.error('Error fetching order lines:', error);
    } finally {
    }
};

export const useSymbolsHook = (onSuccess: any, onError: any) => {
    return useQuery(
        ['fetch-symbols'],
        () => obtainSymbols(),
        {
            cacheTime: 600000,
            staleTime: 60000,
            refetchOnMount: true,
            onSuccess,
            onError,
        },


    )

}