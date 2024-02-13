import { QuickAvatar } from "./quickviewAvatar";


export function QuickView(){

    return(

<div className='flex justify-evenly pb-10'>
            <div className='flex justify-evenly'>
                <div className='img'>
                    <QuickAvatar/>
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Events</p>
                    </div>
                    <div>
                        <p className="text-3xl">18</p>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                <QuickAvatar/>
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Photographers</p>
                    </div>
                    <div>
                        <p className="text-3xl">21</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                <QuickAvatar/>
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Total Employees</p>
                    </div>
                    <div>
                        <p className="text-3xl">53</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
    }