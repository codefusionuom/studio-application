import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function Topbar() {
    return (
        <div className='w-[100%] bg-bg flex justify-between  border-2 border-red-500'>
            <Box>

                <Typography
                    sx={{
                        color: 'var(--text1, #000)',
                        fontFamily: 'Lato',
                        fontSize: 36,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                    }}
                >
                    Good Morning
                </Typography>
                <Typography
                    sx={{
                        color: 'var(--text1, #000)',
                        fontFamily: 'Lato',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                    }}
                >
                    Have a Good day
                </Typography>
            </Box>
            <Box className="flex ">
            <Box
      sx={{
        width: '1px',
        height: '82px',
        borderRight: '1px dotted #ccc', 
        marginRight: '16px', 
        backgroundColor: "#2E2E33"
      }}
    />
              <Box>
              <Typography
      sx={{
        color: 'var(--text2, #707070)',
        fontFamily: 'Lato',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '130%',
      }}
    >
      21 September 2022
    </Typography>
    <Typography
      sx={{
        color: 'var(--text2, #707070)',
        fontFamily: 'Lato',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '130%',
        letterSpacing: '-0.64px',
      }}
    >
      Monday
    </Typography>
              </Box>
            </Box>
        </div>
    )
}

export default Topbar