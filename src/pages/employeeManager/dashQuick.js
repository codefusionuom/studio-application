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
                        <p>Events</p>
                    </div>
                    <div>
                        <p>18</p>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                <QuickAvatar/>
                </div>
                <div>
                    <div>
                        <p>Photographers</p>
                    </div>
                    <div>
                        <p>21</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                <QuickAvatar/>
                </div>
                <div>
                    <div>
                        <p>Total Employees</p>
                    </div>
                    <div>
                        <p>53</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
    }