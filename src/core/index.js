import LinksPanel from './Inputs/LinksPanel'
import Stats from './Stats'
import './styles.css'


export default function Core({ linksData }) {
    console.log('core', linksData)
    return (
        <div className='contents'>
            <LinksPanel 
                linksData={linksData}
            />
            <div className="main">
                <Stats
                    data={linksData}
                />
            </div>
        </div>
    )
}