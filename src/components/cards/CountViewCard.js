import { QuickAvatar } from "./QuickAvatar";
const text = "flex flex-col justify-center border-solid border-black border-1";
const textName = "text-2xl text-black";
const count = "text-4xl text-indigo-900 font-bold";

function CountViewCard() {
  return (
    <div className="flex justify-evenly p-14">


      {/* avatar1 */}
      <div className="flex justify-evenly">
        <div className="img">
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Sales</p>
          </div>
          <div>
            <p className={count}>159</p>
          </div>
        </div>
      </div>


      {/* avatar2 */}
      <div className="flex justify-evenly">
        <div className="img">
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Customers</p>
          </div>
          <div>
            <p className={count}>70</p>
          </div>
        </div>
      </div>


      {/* avatar3 */}
      <div className="flex justify-evenly">
        <div className="img">
          <QuickAvatar />
        </div>
        <div className={text}>
          <div>
            <p className={textName}>Events</p>
          </div>
          <div>
            <p className={count}>40</p>
          </div>
        </div>
      </div>


      {/* avatar4 */}
      <div className="flex justify-evenly">
        <div className="img">
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
      </div>
    </div>
  );
}

export default CountViewCard;
