import React from 'react'
import { Chip} from '@material-tailwind/react'

function onlineShowTb(status) {
  return (
    <div> 
        
        <Chip
    variant="ghost"
    size="sm"
    value={online ? "online" : "offline"}
    color={online ? "green" : "gray"}
/>

</div>
  )
}

export default onlineShowTb