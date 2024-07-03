import axios from "axios";

export const eventManagerServices = {
    
      getAllEvents : async()=> {
       try {
         console.log("kkkkkkkkkkkkkkkkkkkk");
        return  axios
           .get("http://localhost:5000/eventManager/all-events")
       } catch (error) {
        
       }
      }
}
