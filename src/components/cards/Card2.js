
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/solid";


function Card2({onClick,title1,title2}){

    return (
      <Card className="w-96 " onClick={onClick}>
        <CardBody className="inline ">
          <div className="flex text-center items-center text-black w-[340px] h-[140px] ">
            {/* flex justify-center items-center w-[340px] h-[140px] bg-cl-4 rounded   text-cl-1 px-2 */}

            <Typography variant="h5" className="mb-2 ">
              <PlusIcon className="h-14 w-14" />
            </Typography>

            <Typography className="text-xl ml-6 font-lato">
              <b className="font-semibold">{title1}</b>
              <p>{title2}</p>
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
}   
export default Card2