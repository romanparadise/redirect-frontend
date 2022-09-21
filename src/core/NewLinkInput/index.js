import { useState, useRef, useEffect } from 'react'
import { Button } from 'rebass'
import { Input } from '@rebass/forms'
import { addLink } from 'requests'
import { CirclePicker } from 'react-color';
import './styles.css'

const linkColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#607d8b"]

export default function() {
    const [ logs, setLogs ] = useState('')
    const [ chosenColor, setChosenColor ] = useState(linkColors[0])
    const nameRef = useRef(null);
    const redirectsToRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        logs && setTimeout(() => setLogs(null), 5000)
    }, [logs])

    const handleAddClick = async () => {
        try {
            const link = {
                name: nameRef.current.value,
                redirectsTo: redirectsToRef.current.value,
                description: descriptionRef.current.value,
                tags: [chosenColor]
            }
    
            await addLink(link)

            setLogs({
                log: 'Link added!',
                error: false,
            })
        } catch(e) {
            setLogs({
                log: 'Link add failed: ' + e?.response?.data || 'Unknown reason',
                error: true,
            })
        }
        

        
    }

    return (
        <div style={{width: 'fit-content', margin: '20px auto'}}>
            <div style={{ color: '#FFF', fontFamily: 'sans-serif'}}>Добавить ссылку:</div>
            <div className='new-link-form'>
                <Input
                ref={nameRef}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Название ссылки'
                />
                <Input
                ref={redirectsToRef}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Куда будет указывать'
                />
                <Input
                ref={descriptionRef}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Описание'
                />
                <div style={{ backgroundColor: chosenColor}} className='chosen-color'></div>
                <Button onClick={handleAddClick} variant='secondary'>Создать</Button>
            </div>
            <CirclePicker 
                width='fit-content'
                colors={linkColors}
                onChange={color => setChosenColor(color.hex)}
            />
            <div style={{ color: logs?.error ? 'red' : 'green'}} className='log'>
                {logs?.log}
            </div>
        </div>
    )
}