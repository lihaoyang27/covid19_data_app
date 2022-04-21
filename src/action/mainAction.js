import axios from "axios";
import {FETCH_DATA} from "../helper/constant";

export const fetchData = (stat,dateFrom,dateTo) => async dispatch => {
    try {
        const result = await axios.get(`https://api.opencovid.ca/timeseries?stat=${stat}&loc=QC&after=${dateFrom}&before=${dateTo}`)
        if (!!result.data) {
            console.log(result.data)
            dispatch({
                type: FETCH_DATA,
                payload: result.data
            })
        }
    }catch (e) {
        console.log(e)
    }

}