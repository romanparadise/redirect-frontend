import Chart from "./Chart"
import Summary from "./Summary"
import PeriodFilter from "./PeriodFilter"
import './styles.css'


export default function({ data, removeLink, statsDatePeriod, onStatsDatePeriodChange }) {
    return (
        <div className="stats">
            <Chart 
                data={data}
            />
            <PeriodFilter
                onStatsDatePeriodChange={ onStatsDatePeriodChange }
            />
            <Summary
                data={data}
                removeLink={removeLink}
                statsDatePeriod={statsDatePeriod}
            />
        </div>
    )
}