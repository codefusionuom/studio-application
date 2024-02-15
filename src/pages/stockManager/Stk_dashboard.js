import React ,{useState}from 'react'
import Card from '../../components/cards/card.js'
import NotificationCard from '../../components/cards/notificationCard.js'
import Payment from '../../components/pos.js/index.js'
import LongCard from './Stk_components/LongCard.js'
import Modal from './Stk_components/Modal';
import AddStockItemForm from './Stk_forms/AddStockItem.js'
import AddCategoryForm from './Stk_forms/AddCategoryForm.js'
import CategoryList from './Stk_Tables/CategoryList.js'
import StockItemList from './Stk_Tables/StockitemList.js'
import ReturnItemList from './Stk_Tables/ReturnItemList.js'

import ChartStk from './Stk_components/chart.js'
import { Button } from '@material-tailwind/react'


function DashboardSmgr() {
  const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

    };
  
    const closeForm = () => {
      setFormVisible(false);
    };
  return (
    <div className="flex flex-col gap-10">
      <div className=" flex flex-row justify-between">
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <CategoryList onClose={closeForm} />
            </Modal>
          )}
          <CategoryList title={"Category List"} onClose={closeForm} />
        </div>
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <StockItemList onClose={closeForm} />
            </Modal>
          )}
          <StockItemList title={"Stock Item List"} onClose={closeForm} />
        </div>
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <ReturnItemList onClose={closeForm} />
            </Modal>
          )}
          <ReturnItemList title={"Return Item List"} onClose={closeForm} />
        </div>
      </div>


      <div className=" flex flex-row justify-between">
      <Card title={"Stock Item Availability"} />
      <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <AddStockItemForm onClose={closeForm} />
            </Modal>
          )}
        </div>
        <AddStockItemForm title={"+ Create Stock Item"} onClose={closeForm} />

       
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <AddCategoryForm onClose={closeForm} />
            </Modal>
          )}
        </div>
        <AddCategoryForm title={"+ Add New Category"} onClose={closeForm} />

      </div>

      <ChartStk/>

      <Button>Summary Report</Button>
         
  



</div>
  );
}

export default DashboardSmgr