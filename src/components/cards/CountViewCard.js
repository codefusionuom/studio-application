import { useEffect, useState } from 'react';
import { QuickAvatar } from './QuickAvatar';
import axiosInstance from '../../config/axios.config';
const text = 'flex flex-col justify-center border-solid border-black border-1';
const textName = 'text-2xl text-black';
const count = 'text-xl text-indigo-900 font-bold';

function CountViewCard() {
  const [totalPayment, setTotalPayment] = useState(0);
  const [formattedPayment, setFormattedPayment] = useState('');
  const [todayEventsCount, setTodayEventsCount] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);


    useEffect(() => {
      const fetchPaymentAmount = async () => {
        try {
          const response = await axiosInstance.get(
            '/customerManager/paymentAmount'
          );
          const paymentData = response.data;
          if (paymentData && paymentData.totalPayment !== undefined) {
            setTotalPayment(paymentData.totalPayment);
            const formatted = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'LKR',
            }).format(paymentData.totalPayment);
            setFormattedPayment(formatted);
          } else {
            console.error(
              'Invalid response structure for payment amount:',
              paymentData
            );
          }
        } catch (error) {
          console.error('Error fetching customer payments:', error);
        }
      };

      fetchPaymentAmount();
    }, []);

    useEffect(() => {
      const fetchTodayEvents = async () => {
        try {
          const response = await axiosInstance.get('/eventManager/todayEvent');
          const eventData = response.data;
          if (eventData && eventData.todayEvents !== undefined) {
            setTodayEventsCount(eventData.todayEvents.length);
          } else {
            console.error(
              "Invalid response structure for today's events:",
              eventData
            );
          }
        } catch (error) {
          console.error("Error fetching today's events:", error);
        }
      };

      fetchTodayEvents();
    }, []);

  useEffect(() => {
    const fetchAttendanceCount = async () => {
      try {
        const response = await axiosInstance.get(
          '/employeeManager/getAttendenceCountToday'
        ); // Adjust the endpoint as needed
        setAttendanceCount(response.data.count);
      } catch (err) {
        console.error("Error fetching today's attendence:", err);
      }
    };

    fetchAttendanceCount();
  }, []);

  // useEffect(() => {
  //   console.log(attendanceCount);
  // }, [attendanceCount]);

  return (
    <div className='flex justify-around p-14'>
      {/* avatar1 */}
      <div className='flex justify-evenly'>
        <div className='img'>
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Sales</p>
          </div>
          <div>
            <p className={count}>{formattedPayment}</p>
          </div>
        </div>
      </div>

      {/* avatar2 */}
      <div className='flex justify-evenly'>
        <div className='img'>
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Events</p>
          </div>
          <div>
            <p className={count}>{todayEventsCount}</p>
          </div>
        </div>
      </div>

      {/* avatar3 */}
      <div className='flex justify-evenly'>
        <div className='img'>
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Employees</p>
          </div>
          <div>
            <p className={count}>{attendanceCount}</p>
          </div>
        </div>
      </div>
      {/* avatar4 */}
      {/* <div className='flex justify-evenly'>
        <div className='img'>
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Orders</p>
          </div>
          <div>
            <p className={count}>56</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default CountViewCard;
