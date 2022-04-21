import EChartsReact from "echarts-for-react";
import '../style/chart.scss'


const Charts = ({xAxis, yAxis,stat}) => {



    let option = {
        title:{
            text:stat.toUpperCase()
        },
        xAxis: {
            type: 'category',
            data: xAxis,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yAxis,
                type: 'line',
            }
        ]
    };

    return(
        <div className='chartContainer'>
            <EChartsReact option={option} />
        </div>
    )
}

export default Charts