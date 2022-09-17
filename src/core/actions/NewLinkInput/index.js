import { useState } from 'react'
import { Label, Input } from '@rebass/forms'
import { requestAddLink } from 'requests'

export default function() {
    const [ inputs, setInputs ] = useState()

    const handleAddClick = async () => {
        await requestAddLink()
    }

    return (
        <>
            <Label htmlFor='text'>Text</Label>
            <Input
                id='text'
                name='email'
                type='text'
                placeholder='KBHdwcwkd'
            />
        </>
    )
}