import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react'

function CardEvent({title , onTap}) {

  return (
    //     <Card className="mt-6 w-[314px] h-[140px] bg-cl-4 flex items-center justify-center  ">
    //     <CardBody>

    //       <Typography   color="blue-gray" className="mb-2 font-lato text-[22px]">
    //         {title}
    //       </Typography>
    //     </CardBody>

    //   </Card>
    <div className="flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1" onClick={onTap}>
      {title}
    </div>
  );
}

export default CardEvent