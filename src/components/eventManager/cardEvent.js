import { Card, CardBody} from '@material-tailwind/react'
import React from 'react'

function CardEvent(props) {

  return (
        <Card className={` w-${props.width} h-${props.height} bg-cl-4 flex items-center justify-center  `}>
        <CardBody>

        <div className=" bg-cl-4 rounded font-lato text-xl text-cl-1" onClick={props.onTap}>
      {/* {props.title} */}
      {props.children}
    </div>
        </CardBody>

      </Card>
 
  );
}

export default CardEvent