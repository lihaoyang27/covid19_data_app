import '../style/main.scss'
import {FETCH_DATA} from "../helper/constant";

const initState = {
    allData: null,
}

const MainReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type){
        case FETCH_DATA:
            console.log('alldata',payload)
            return {...state, allData: payload}

        default:
            return state
    }

}

export default MainReducer