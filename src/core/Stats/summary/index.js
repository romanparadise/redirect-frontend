import LinkItem from "./LinkItem"

export default function Summary({ data, removeLink, statsDatePeriod }) {
    let clicksSum = 0
    const contents = data.map(link => {
        const clicksInPeriod = statsDatePeriod && link.clicks.filter(click => (!statsDatePeriod[0] || click >= statsDatePeriod[0]) && (!statsDatePeriod[1] || click <= statsDatePeriod[1]))

        clicksSum += clicksInPeriod.length

        return <LinkItem 
            key={link._id} 
            link={link} 
            clicksCount={clicksInPeriod.length} 
            onRemove={() => removeLink(link) } 
            statsDatePeriod={statsDatePeriod} 
        />
    })
    return (
        <div>
            {contents}
            <div style={{ color: '#555', textAlign: 'center', fontFamily: 'sans-serif', }}>
                Кликов по этим ссылкам за выбранный период <span style={{ color: 'rgb(156, 39, 176)'}} >{clicksSum}</span>
            </div>
        </div>
    )
}