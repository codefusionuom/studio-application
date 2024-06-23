import React from 'react'
import Customerform from './customerform'
import { Input, Textarea, Typography } from '@material-tailwind/react'
import DisabeldDatePicker from './disabeldDatePicker'

function RequestCustomer({requestedCustomer,mode,setCustomerRequest,customerRequest,
    setSearch,
    customerList,
    setCustomerList}) {

      
  return (
    <div className="grid  gap-20 p-10">
    <Customerform
      initialvalues={requestedCustomer}
      mode={mode}
      setSearch={setSearch}
      customers={customerList}
      setCustomers={setCustomerList}
      componentType={0}
      customerRequest={customerRequest}
      setCustomerRequest={setCustomerRequest}
    />
    {requestedCustomer.conflict ? (
      <div className="flex justify-center">
        {" "}
        There is conflict with previous recorded data and newly requested
        data
      </div>
    ) : (
      ""
    )}

    <div className="grid grid-cols-2 justify-between gap-10">
      {requestedCustomer.note ? (
        <div className="flex flex-col gap-4 w-full">
          <Typography className="-mb-2" variant="h6">
            Note
          </Typography>
          <Textarea
            label="note"
            value={requestedCustomer.note}
            id="note"
            type="text"
            size="lg"
          />
        </div>
      ) : (
        ""
      )}
      {requestedCustomer.serviceType ? (
        <div className="flex flex-col gap-4 w-full">
          <Typography className="-mb-2" variant="h6">
            serviceType
          </Typography>
          <Input
            label="serviceType"
            value={requestedCustomer.serviceType}
            id="note"
            type="text"
            size="lg"
          />
        </div>
      ) : (
        ""
      )}
      {requestedCustomer.serviceDate ? (
        <div className="flex flex-col gap-4 w-full">
          <Typography className="-mb-2" variant="h6">
            Event Date
          </Typography>
          <DisabeldDatePicker date={requestedCustomer.serviceDate} />
        </div>
      ) : (
        ""
      )}
      {requestedCustomer.createdAt ? (
        <div className="flex flex-col gap-4 w-full">
          <Typography className="-mb-2" variant="h6">
            Requested Date
          </Typography>
          <DisabeldDatePicker date={requestedCustomer.createdAt} />
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
  )
}

export default RequestCustomer