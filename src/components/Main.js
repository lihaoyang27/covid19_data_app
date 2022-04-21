import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchData} from "../action/mainAction";
import Charts from "./Charts";


const Main = () => {
    const dispatch = useDispatch()
    const [stat, setStat] = useState('cases')
    const [dateFrom, setDateFrom] = useState('2020-01-25')
    const [dateTo, setDateTo] = useState('')
    const data = useSelector(state => state?.MainReducer?.allData)
    const [dateKeyWord, setDateKeyWord] = useState('date_report')
    const [valueKeyWord, setValueKeyWord] = useState('cases')
    const [showChart, setShowChart] = useState(false)
    const [xAxis, setXAxis] = useState([])
    const [yAxis, setYAxis] = useState([])

    const switchCase = (stat) => {
        switch (stat) {
            case 'cases':
                setDateKeyWord('date_report')
                setValueKeyWord('cases')
                break

            case 'recovered':
                setDateKeyWord('date_recovered')
                setValueKeyWord('recovered')
                break

            case 'testing':
                setDateKeyWord('date_testing')
                setValueKeyWord('testing')
                break

            case 'mortality':
                setDateKeyWord('date_death_report')
                setValueKeyWord('deaths')
                break

            case 'dvaccine':
                setDateKeyWord('date_vaccine_distributed')
                setValueKeyWord('dvaccine')
                break

            case 'avaccine':
                setDateKeyWord('date_vaccine_administered')
                setValueKeyWord('avaccine')
                break

            case 'cvaccine':
                setDateKeyWord('date_vaccine_completed')
                setValueKeyWord('cvaccine')
                break

            default:
                setDateKeyWord('date_report')
                setValueKeyWord('cases')
        }
    }

    const getChartValue = () => {
        let tempX = []
        let tempY = []

        for (let value of data[stat]) {
            tempX.push(value[dateKeyWord])
            tempY.push(value[valueKeyWord])
        }

        setXAxis(tempX)
        setYAxis(tempY)
    }

    useEffect(() => {
        switchCase(stat)
        // getChartValue()
    }, [stat])

    useEffect(() => {
        if (data) {
            getChartValue()
        }
    }, [data])



    return (
        <>
            <div className='container'>
                <h1>COVID-19 Data For Quebec</h1>
                <div className='inputArea'>
                    <div className='stat'>
                        Category:
                        <select value={stat} onChange={(e) => {
                            setStat(e.target.value)
                            setShowChart(false)
                        }}>
                            <option value="cases">Cases</option>
                            <option value="mortality">Mortality</option>
                            <option value="recovered">Recovered</option>
                            <option value="testing">Testing</option>
                            <option value="dvaccine">Dvaccine</option>
                            <option value="avaccine">Avaccine</option>
                            <option value="cvaccine">Cvaccine</option>
                        </select>
                    </div>
                    <div className='dateFrom'>Start Date: <input type='date' value={dateFrom}
                                                                 onChange={event => setDateFrom(event.target.value)}/>
                    </div>
                    <div className='dateTo'>End Date: <input type='date' value={dateTo}
                                                             onChange={event => setDateTo(event.target.value)}/></div>
                </div>
                <div className='buttonArea'>
                    <button onClick={() => {
                        fetchData(stat, dateFrom, dateTo)(dispatch)
                    }}> Get Data
                    </button>
                    <button onClick={() => {
                        setShowChart(!showChart)
                    }}>{showChart ? "Hide Chart" : "Show Chart"}</button>
                </div>
                <div className='dataArea'>
                    {
                        data &&
                        <>
                            <div className='tableHead'>
                                <div>Province</div>
                                <div>Date</div>
                                <div>Cases</div>
                            </div>
                            <div className='tableBody'>
                                {
                                    data[stat]?.map((value, index) => {
                                        return (
                                            <div className='tableItem' key={index}>
                                                <div>{value.province}</div>
                                                <div>{value[dateKeyWord]}</div>
                                                <div>{value[valueKeyWord]}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </>
                    }
                </div>
                {
                    showChart
                    &&
                    <Charts xAxis={xAxis} yAxis={yAxis} stat={stat}/>
                }
            </div>

        </>
    )

}

export default Main