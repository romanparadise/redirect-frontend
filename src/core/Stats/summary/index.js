import LinkItem from "./LinkItem"

export default function Summary({ data, removeLink, statsDatePeriod }) {
    const contents = data.map(link => <LinkItem key={link._id} link={link} onRemove={() => removeLink(link) } statsDatePeriod={statsDatePeriod} />)
    return (
        <>
            {contents}
        </>
    )
}