import React ,{useState}from 'react'
import Card from '../../components/cards/card.js'
import NotificationCard from '../../components/cards/notificationCard.js'
import Payment from '../../components/pos.js/index.js'
import LongCard from './Stk_components/LongCard.js'
import Modal from './Stk_components/Modal';
import AddStockItemForm from './Stk_forms/AddStockItem.js'
import AddCategoryForm from './Stk_forms/AddCategoryForm.js'

function DashboardSmgr() {
  const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

    };
  
    const closeForm = () => {
      setFormVisible(false);
    };
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex gap-10'>
        <Card title={"Stock Item Availability"}/>
        <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <AddStockItemForm onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <AddStockItemForm title={'+ Create Stock Item'} onClose={closeForm} />

          <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <AddCategoryForm onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <AddCategoryForm title={'+ Add New Category'} onClose={closeForm} />

          
                
       
        </div>
        <div className=''>
        <LongCard title={"Stock Items" } title2={"View more >"}/>
        <LongCard title={"Categories" } title2={"View more >"}/>
        <LongCard title={"Returned Items" } title2={"View more >"}/>
        </div>
       
    </div>
  )
}

export default DashboardSmgr