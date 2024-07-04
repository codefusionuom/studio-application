import React from 'react'
import Topbar from './Topbar'
import { DefaultSidebar } from './newbar'

function Layout({ children,sections }) {
    return (
        
            <div className="flex bg-bg "  >
                <div className='bg-primary w-[30%]'>
                    {/* <SidebarNim>
                    </SidebarNim> */}
                    <DefaultSidebar sections={sections}/>
                </div>

                <div   className=' w-full m-[60px] h-[1024px] overflow-scroll ' >
                    <Topbar/>
                      {children}
                      
                      {/* <div className='h-[140vh]'></div> */}
                </div>

            </div>

    )
}

export default Layout