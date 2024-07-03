import { Card, CardBody } from "@material-tailwind/react";
import { QuickAvatar } from "./quickviewAvatar";

export function QuickView1() {
    return (
        <div className='flex justify-evenly pb-10'>
            <div className='flex justify-evenly'>
                <div className='img'>
                    <QuickAvatar />
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Attendance</p>
                    </div>
                    <div>
                        <p className="text-3xl">5</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                    <QuickAvatar />
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Photographers</p>
                    </div>
                    <div>
                        <p className="text-3xl">3</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='img'>
                    <QuickAvatar />
                </div>
                <div>
                    <div>
                        <p className="font-sans text-gray-600">Total Employees</p>
                    </div>
                    <div>
                        <p className="text-3xl">9</p>
                    </div>
                </div>
            </div>
        </div>
    )
}