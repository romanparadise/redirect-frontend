import { Link } from '@rebass/forms'
import './styles.css'

const colors = {
    'red': 'red',
    'green': 'green',
    'blue': 'blue',
}

export default function Link({ name, redirectsTo, clicks, description, tags }) {

    return <div className='link'>
        <div className='link-name'>{name}</div>
        <Link href=""/>
        <div className='link-url'>{redirectsTo}</div>
        <div className='link-clicks'>{clicks.length}</div>
        <div className='link-description'>{description}</div>
    </div>
}