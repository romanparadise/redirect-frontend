import './styles.css'

export default function({ name, redirectsTo, clicks, description, tags, selected, handleClick, statsDatePeriod }) {
    const color = tags.find(tag => tag.startsWith('#'))
    const clicksInPeriod = statsDatePeriod && clicks.filter(click => (!statsDatePeriod[0] || click >= statsDatePeriod[0]) && (!statsDatePeriod[1] || click <= statsDatePeriod[1]))

    return <div style={{ borderColor: color }} className={`link ${selected ? 'selected' : ''}`} onClick={handleClick}>
        <div style={{ backgroundColor: color }} className='link-name'>{name}</div>
        <div className='link-url'>{redirectsTo}</div>
        <div className='link-clicks'>{clicksInPeriod?.length}</div>
        <div className='link-description'>{description}</div>
    </div>
}