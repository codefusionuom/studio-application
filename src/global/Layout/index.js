import React from 'react'
import SidebarNim from './sidebar'
import TemporaryDrawer from './prosidebar'
import MiniDrawer from './muibar'
import { Box } from '@mui/material'
import Topbar from './Topbar'

function Layout({ children }) {
    return (
        <div className="bg-bg border-2 border-red-500">
            {/* {children} */}
            {/* <TemporaryDrawer/> */}
            {/* <MiniDrawer/> */}
            <Box display={"flex"} flexDirection={"row"}  className="bg-bg border-2 border-red-500">
                <Box>
                    <SidebarNim>
                    </SidebarNim>
                </Box>

                <Box  left={"80px"} className='w-full m-[60px]' >
                    <Topbar/>
                      {children}
                </Box>

            </Box>

        </div>
    )
}

export default Layout