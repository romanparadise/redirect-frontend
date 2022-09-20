import Link from './Link'

export default function LinksPanel({ linksData=[], selectedLinks, statsDatePeriod, onLinkClick }) {
    const linkElements = linksData.map(link => {
        return <Link
            key={link._id}
            name={link.name}
            redirectsTo={link.redirectsTo}
            clicks={link.clicks}
            tags={link.tags}
            selected={selectedLinks.map(l=>l._id).includes(link._id)}
            statsDatePeriod={statsDatePeriod}
            handleClick={() => onLinkClick(link)}
        />
    })

    return (
        <div className='links-panel'>
            {
                linkElements
            }
        </div>
    )
}