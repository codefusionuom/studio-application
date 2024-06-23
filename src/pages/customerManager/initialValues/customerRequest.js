export const TABLE_HEAD = ["Full name", "Mobile phone", "Service Type","Service Date", "Created At", "Status"];

export const initialCustomerRequest = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    mobilePhone: "",
    address: "",
    serviceType: "",
    serviceDate: "",
    note: "",
    status: "inprogress",
    createdAt: "",
    updatedAt: "",
  };

  export const initialService ={
    serviceName: "",
    serviceType: "",
  }

  export const initialEventRequest ={
    services:[],customerId:"",note:""
  }