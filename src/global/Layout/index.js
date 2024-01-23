import React from 'react'
import SidebarNim from './sidebar'
import Topbar from './Topbar'
import { DefaultSidebar } from './newbar'

function Layout({ children }) {
    return (
        <div className="bg-bg ">
            <div className="flex"  >
                <div>
                    {/* <SidebarNim>
                    </SidebarNim> */}
                    <DefaultSidebar/>
                </div>

                <div   className=' w-full m-[60px]' >
                    <Topbar/>
                      {children}
                </div>

            </div>

        </div>
    )
}

export default Layout