// import { QuickAvatar } from "./quickviewAvatar";


function CountViewCard(){

    return(

<div className='flex justify-evenly pb-10 my-20'>
            <div className='flex justify-evenly'>
                <div className='img'>
                    {/* <QuickAvatar/> */}
                </div>
                <div>
                    <div>
                        <p>Sales</p>
                    </div>
                    <div>
                        <p>159</p>
                    </div>
                </div>

            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                {/* <QuickAvatar/> */}
                </div>
                <div>
                    <div>
                        <p>Customers</p>
                    </div>
                    <div>
                        <p>70</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                {/* <QuickAvatar/> */}
                </div>
                <div>
                    <div>
                        <p>Events</p>
                    </div>
                    <div>
                        <p>40</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                {/* <QuickAvatar/> */}
                </div>
                <div>
                    <div>
                        <p>Orders</p>
                    </div>
                    <div>
                        <p>56</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
    }

export default CountViewCard