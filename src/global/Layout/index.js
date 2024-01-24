import React from 'react'
import SidebarNim from './sidebar'
import Topbar from './Topbar'
import { DefaultSidebar } from './newbar'

function Layout({ children }) {
    return (
        
            <div className="flex bg-bg "  >
                <div className=''>
                    {/* <SidebarNim>
                    </SidebarNim> */}
                    <DefaultSidebar/>
                </div>

                <div   className=' w-full m-[60px]' >
                    <Topbar/>
                      {children}
                      
                      {/* <div className='h-[140vh]'></div> */}
                </div>

            </div>

    )
}

export default Layout