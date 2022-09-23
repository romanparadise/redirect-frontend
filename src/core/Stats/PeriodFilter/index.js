import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import utc from 'dayjs/plugin/utc'
import './styles.css'

dayjs.extend(utc)

export default function({ onStatsDatePeriodChange }) {
    const [from, setFrom] = useState(dayjs().subtract(1, 'day'))
    const [to, setTo] = useState(null)

    useEffect(() => {
        onStatsDatePeriodChange(new Date(from).getTime(), new Date(to).getTime())
        console.log(from, to)
    }, [from, to, onStatsDatePeriodChange])

    return (
        <div className='date-pickers'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="From"
                    value={from}
                    onChange={(newValue) => {
                        setFrom(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={false}
                />
                <DateTimePicker
                    label="To"
                    value={to}
                    onChange={(newValue) => {
                        setTo(newValue);
                    }}
                    renderInput={(params) => {
                        return params.inputProps.value ? <TextField {...params} /> : <TextField {...Object.assign(params, { inputProps: Object.assign(params.inputProps, { value: 'и до текущего момента' }) })} />
                    }}
                    ampm={false}
                />
            </LocalizationProvider>
        </div>
    )
}