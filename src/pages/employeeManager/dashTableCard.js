import React from 'react'

function DashTableCard({title1,title2,title3,onClick}) {
  return (
    <div  onClick={onClick} className='w-[340px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 px-2 flex justify-center'>

        <table class="border border-collapse border-black">

        <tbody>
          <tr aria-rowspan={2}>
            <td class="border border-black px-4 py-2">{title1}</td>
            <td class="border border-black px-4 py-2">{title2}</td>
          </tr>
          <tr>
            <td class="border border-black px-4 py-2">{title3}</td>
          </tr>
        </tbody>
      </table>







    </div>
  )
}

export default DashTableCard