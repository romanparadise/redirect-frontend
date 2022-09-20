import toast from 'react-hot-toast'
import './styles.css'


async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

export default function({ link, onRemove, statsDatePeriod }) {
    const clicksInPeriod = statsDatePeriod && link.clicks.filter(click => (!statsDatePeriod[0] || click >= statsDatePeriod[0]) && (!statsDatePeriod[1] || click <= statsDatePeriod[1]))
    const redirectDomain = process.env.REACT_APP_REDIRECT_LINK_DOMAIN

    const onLinkNameClick = () => {
        copyTextToClipboard(`${redirectDomain}/${link.name}`)
        toast('Link copied!',
            {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }

    return (
        <div className='link-item'>
            <span className='item-pointer'>➭</span>
            <div onClick={onLinkNameClick} style={{width: '100px'}} className='link-item-name'>{link.name}</div>
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