import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Drawer,
    Avatar,
} from "@material-tailwind/react";
import { useState } from "react";



export function DefaultSidebar() {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [roleList, setRoleList] = useState(false);
    const roles = ["Customer Manager", "Event Manager","Super Admin"]
    const [role,setRole]=useState(roles[0])

   
    const list = [{
        name: "Dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
    }, {
        name: "Admins", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    }, {
        name: "Event Calendar", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
    },
    {
        name: "Departments", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
    },
    {
        name: "Settings", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    }]




    return (<div >
        {!open ? <><Card className="h-[calc(100vh-2rem)] w-[100px] bg-primary rounded-none   p-4 shadow-xl shadow-blue-gray-900/5">
            <List className=" w-[50px]">

                <ListItem className=" w-[50px] hover:text-white text-white focus:text-white  focus:bg-white focus:bg-opacity-15" >
                    <ListItemPrefix >
                        <svg onClick={() => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </ListItemPrefix>
                </ListItem>


                {/* <ListItem className=" w-[50px] hover:text-white text-white focus:text-white  focus:bg-white focus:bg-opacity-15 mt-20 mb-20" >
                    <ListItemPrefix >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    </ListItemPrefix>
                </ListItem> */}
                <div className="flex w-[50px]  justify-center  ">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="w-8 h-8 my-20" />
                </div>
                {list.map((item, index) => {
                    return (<ListItem className=" w-[50px] focus:text-white   text-white focus:bg-white focus:bg-opacity-15 mt-8" >
                        <ListItemPrefix onClick={() => setSelectedIndex(index)}>
                            {item.icon}
                        </ListItemPrefix>
                    </ListItem>)
                })}







            </List>
        </Card></> : <>
            <Drawer
                open={open}
                onClose={() => {setOpen(false);setRoleList(false)}}
            >
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[100vh] w-[375px] bg-primary rounded-none   p-4 shadow-xl "
                >
                    <div className="mb-2 flex items-center justify-between gap-4 p-4">
                        <Typography fontSize={"24px"} color={"white"} align="center">
                            Admin Panel
                        </Typography>
                        <svg onClick={() => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-cl-4">
                            <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex justify-center align-center flex-col my-10">
                            <div className="flex justify-center   ">
                                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="w-24 h-24 my-10" />
                            </div>

                            <Typography fontSize={"24px"} color={"white"} align="center">
                                Smoe Joe
                            </Typography>
                            <div className="flex justify-center gap-2 relative">
                                <Typography fontFamily={"16px"} color={"rgba(255, 255, 255, 0.40)"} align="center" sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    gap: "5px"
                                }}>
                                    {role}
                                </Typography>
                                <svg onClick={() => setRoleList(!roleList)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cl-4">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                                {roleList ==true && <div className="absolute top-10">
                                    <Card className="">
                                        <List className="bg-opacity-15 z-10">
                                            {roles.map((role,index)=>(
                                                <ListItem className="bg-opacity-15" onClick={()=>{setRole(role);setRoleList(!roleList)}}>{role}</ListItem>

                                            ))}
                                        
                                        </List>
                                    </Card>
                                </div>}
                            </div>

                        </div>
                    </div>

                    <div className="w-[full ">
                        {list.map((item, index) => {
                            return (<ListItem className=" w-[full] focus:text-white  text-white focus:bg-white focus:bg-opacity-15 mt-8 " >
                                <ListItemPrefix onClick={() => setSelectedIndex(index)} className="w-[full] flex-1 flex justify-start ">
                                    <div className="mr-10">{item.icon}</div>  <div className="text-xl">{item.name}</div>
                                </ListItemPrefix>
                            </ListItem>)
                        })}
                    </div>

                    <div class="flex justify-center mt-20 mb-20 rounded-lg">
                        <button class="bg-white text-primary  text-xl flex items-center px-4 py-2 gap-2  rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>

                            <span class="text-primary">Log out</span>
                        </button>
                    </div>
                </Card>
            </Drawer>
        </>}

    </div>

    );
}