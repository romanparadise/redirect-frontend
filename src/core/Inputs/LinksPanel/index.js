import Link from './Link'

export default function LinksPanel({ linksData=[] }) {
    console.log('panel', linksData)
    const linkElements = linksData.map(link => {
        return <Link
            name={link.name}
            redirectsTo={link.redirectsTo}
            clicks={link.clicks}
            description={link.description}
            tags={link.tags}
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