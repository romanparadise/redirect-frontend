import { useCallback, useState } from 'react'
import LinksPanel from './LinksPanel'
import NewLinkInput from './NewLinkInput'
import Stats from './Stats'
import './styles.css'


export default function Core({ linksData, selectedLinks, onLinkClick, removeLink }) {
    const [ statsDatePeriod, setStatsDatePeriod ] = useState()

    const onStatsDatePeriodChange = useCallback((...period) => setStatsDatePeriod(period), [setStatsDatePeriod])

    return (
        <div className='contents'>
            <LinksPanel 
                linksData={linksData}
                selectedLinks={selectedLinks}
                onLinkClick={onLinkClick}
                statsDatePeriod={statsDatePeriod}
            />
            <div className="main">
                <Stats
                    data={selectedLinks}
                    removeLink={removeLink}
                    onStatsDatePeriodChange={ onStatsDatePeriodChange }
                    statsDatePeriod={statsDatePeriod}
                />
                <NewLinkInput />
            </div>
        </div>
    )
}