import './styles.css'

export default function({ link, onRemove, statsDatePeriod }) {
    const clicksInPeriod = statsDatePeriod && link.clicks.filter(click => (!statsDatePeriod[0] || click >= statsDatePeriod[0]) && (!statsDatePeriod[1] || click <= statsDatePeriod[1]))
    return (
        <div className='link-item'>
            <span className='item-pointer'>➭</span>
            <div style={{width: '100px'}} className='link-item-name'>{link.name}</div>
            <span>🌐</span>
            <a style={{width: '100px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis'}} href={link.redirectsTo.startsWith('http') ? link.redirectsTo : ('http://' + link.redirectsTo)}>{link.redirectsTo}</a>
            <span className='counter-emoji'>☝</span>
            <div className='clicks-count'>{clicksInPeriod?.length}</div>
            <span></span>
            { link.description && <div className='link-item-description'>({link.description})</div> }
            <span></span>
            <div style={{opacity: 0.7, position: 'absolute', right: 0}}>{ link.tags?.map(tag => !tag.startsWith('#') ? `#${tag}` : tag).join(' ') }</div>
            <span className='remove-icon' onClick={onRemove}>🙅</span>
        </div>
    )
}