import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GiCancel } from 'react-icons/gi';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import styles from './Customer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, deleteCustomer, editCustomer } from "../redux/Reducers";
import LineGraph from './LineGraph';
import RideBooking from './RideBooking';
import users  from '../data';
// import UserActivityGraph from './UserActivityGraph ';
// import ActivityGraph from './ActivityGraph';


const Customer = () => {
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [customers, setCustomers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState('');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  

  const mockUserActivityData = [
    { date: '2023-08-01', newUsers: 5 },
    { date: '2023-08-02', newUsers: 8 },
    { date: '2023-08-03', newUsers: 12 },
    { date: '2023-08-04', newUsers: 32 },
    { date: '2023-08-05', newUsers: 25 },
    { date: '2023-08-06', newUsers: 43 },
  ];

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((data) => {
        // Sort the initial data by id in ascending order
        const sortedCustomers = users.sort((a, b) => a.id - b.id);
        setCustomers(sortedCustomers);
        console.log(sortedCustomers)
        console.log("abc")
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const handleEditClick = (customer) => {
    setEditedCustomer(customer);
    setEditModalOpen(true);
  };

  const handleEditChange = (field, value) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value,
    }));
  };

  const handleEditSubmit = () => {
    // Update the customer's data
    dispatch(editCustomer({ id: editedCustomer.id, editedCustomer }));
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === editedCustomer.id ? editedCustomer : customer
      )
    );

    setEditModalOpen(false);
    setEditedCustomer({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
    });
  };

  const handleDeleteClick = (customerId) => {
    setDeleteCustomerId(customerId);
    setDeleteModalOpen(true);
  };

  const handleDeleteSubmit = () => {
    dispatch(deleteCustomer(deleteCustomerId));
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== deleteCustomerId)
    );

    setDeleteModalOpen(false);
    setDeleteCustomerId('');
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleNewChange = (field, value) => {
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();   
    const newId = customers.length + 1;
    const newCustomerWithId = { ...newCustomer, id: newId };
    dispatch(addCustomer(newCustomerWithId));
    setCustomers((prevCustomers) => [...prevCustomers, newCustomerWithId]);

    setAddModalOpen(false);
    setNewCustomer({
      first_name: '',
      last_name: '',
      email: '',
    });
  };


    // Sorting function
    const sortTable = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
  
      const sortedCustomers = [...customers].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
  
      setCustomers(sortedCustomers);
    };


  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <h1 className='text-black font-bold uppercase text-[25px] my-10 tracking-[2px] ml-8'>customers</h1>

      <div className='w-full bg-[#f3f3f3] flex flex-col justify-start items-start'>
        <button className='bg-[#043933] text-white text-[20px] tracking-[2px] px-3 py-2 rounded-lg ml-8 my-8' onClick={handleAddClick}>
          <span className='mr-3 text-[20px]'>+</span> Add New Customer
        </button>

        <div className='w-full bg-[#f3f3f3] h-full'>
          <div className='grid grid-cols-12 '>
            <div className='bg-[#c5e3d6] mx-auto col-span-12 grid grid-cols-12 text-[#015249] font-bold sm:justify-evenly w-[100%] md:w-[80%] py-3 rounded-md'>
            <div className=' col-span-3'></div>
            
              <h3 className=' col-span-2' onClick={() => sortTable('first_name')}>Customer Name</h3>
              <h3 className=' col-span-2' onClick={() => sortTable('email')}>email</h3>
              <h3 className=' col-span-1' onClick={() => sortTable('id')}>Role</h3>
              <div className=' col-span-4'></div>
            </div>
          </div>

          <div className='grid grid-cols-12'>
            {customers.map((customer) => (
              <div className='bg-white w-[80%] col-span-12 grid grid-rows-2 lg:grid-rows-1 sm:grid-cols-12 rounded-md p-4 mx-auto mt-5' key={customer.id}>
                <img src={customer.avatar} alt={`Avatar of ${customer.first_name}`} className=' col-span-3 h-[40px]' />
                
                <div className='col-span-2 flex justify-center items-center text-[14px] mr-3'>{`${customer.first_name} ${customer.last_name}`}</div>
                <div className='col-span-2 flex justify-center items-center text-[12px]'>{customer.email}</div>
                <div className='col-span-1 flex justify-center items-center text-[12px] '>{customer.role}</div>
                <div className='col-span-4 flex justify-end items-center'>
                  <button onClick={() => handleEditClick(customer)} className='mx-2 bg-green-500 px-4 py-1 rounded-md text-green-800'>Edit</button>
                  <button onClick={() => handleDeleteClick(customer.id)} className='mx-2 bg-red-500 px-4 py-1 rounded-md text-red-800'>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
              {/* Display the UserActivityGraph component */}
      {/* <UserActivityGraph userActivityData={mockUserActivityData}/> */}
      {/* <ActivityGraph  userActivityData={mockUserActivityData}/> */}
      <div className='bg-white mt-3 rounded-2xl p-3 mx-auto '>
      <LineGraph data={mockUserActivityData} />
      </div>
        
        <RideBooking/>
      </div>
              






      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel='Edit Customer Modal'
        className={`${styles.ReactModal__Content} ${styles.ReactModal__Overlay}`}
      >
        <div className='h-[100px] flex justify-center rounded-xl items-end bg-green-700 relative'> 
        <button type='button' onClick={() => setEditModalOpen(false)} className='absolute right-2 top-2'>
            <GiCancel className=' text-red-500'/>
          </button> <h1 className='text-white text-[20px] font-bold'> Edit Customer</h1></div>
        <form className='flex flex-col items-center justify-between' onSubmit={handleEditChange}>
            <input
              type='text'
              value={editedCustomer.first_name}
              onChange={(e) => handleEditChange('first_name', e.target.value)}
              className='my-4 w-[250px] p-3'
            />

            <input
              type='text'
              value={editedCustomer.last_name}
              onChange={(e) => handleEditChange('last_name', e.target.value)}
              className='my-4 w-[250px] p-3'
            />


            <input
              type='email'
              value={editedCustomer.email}
              onChange={(e) => handleEditChange('email', e.target.value)}
              className='my-4 w-[250px] p-3'
            />

          <button type='button' onClick={handleEditSubmit} className='bg-green-300 p-2 rounded-xl w-[250px]'>
            Submit
          </button>

        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        contentLabel='Delete Customer Modal'
        className={`${styles.ReactModal__Content} ${styles.ReactModal__Overlay}`}
      >
                <div className='h-[200px] flex justify-center rounded-xl items-end relative'> 
        <button type='button' onClick={() => setDeleteModalOpen(false)} className='absolute right-2 top-2'>
            <GiCancel className=' text-red-500'/>
          </button> 
          <RiDeleteBin6Fill className='text-[150px] text-red-500'/>
          </div>
              <h2 className='font-bold text-[20px] text-center'>Are you Sure ?</h2>
              <p className='text-center my-5 font-semibold'>
                Do you really want to delete this cutomer<br/>
                This process cannot be undone
              </p>
  
            <div className='flex justify-center'>
              <form onSubmit={handleDeleteSubmit}>
          <button onClick={() => setDeleteModalOpen(false)} className='bg-green-300 p-2 rounded-xl w-[150px] mx-2'>
            cancel
          </button>
          <button type='submit' className='bg-red-500 p-2 rounded-xl w-[150px] mx-2'>
            delete
          </button>
          </form>
          </div>

      </Modal>






      {/* Add New Customer Modal */}
      <Modal
        isOpen={addModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
        contentLabel='Add Customer Modal'
        className={`${styles.ReactModal__Content} ${styles.ReactModal__Overlay}`}
      >
                <div className='h-[100px] flex justify-center rounded-xl items-end bg-green-700 relative'> 
        <button type='button' onClick={() => setAddModalOpen(false)} className='absolute right-2 top-2'>
            <GiCancel className=' text-red-500'/>
          </button> <h1 className='text-white text-[20px] font-bold'> Add New Customer</h1></div>
        <form className='flex flex-col items-center justify-between' onSubmit={handleAddSubmit}>
        <input
  type='text'
  placeholder='Customer name'
  value={newCustomer.first_name}
  onChange={(e) => handleNewChange('first_name', e.target.value)}
  className='my-4 w-[250px] p-3 border-black'
/>

<input
  type='email'
  placeholder='Customer Email'
  value={newCustomer.email}
  onChange={(e) => handleNewChange('email', e.target.value)}
  className='my-4 w-[250px] p-3'
/>


            <label className='my-4 cursor-pointer text-green-500'>
                  Upload Photo
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden' 
                  />
                </label>

          
          <button type='submit'  className='bg-green-300 p-2 rounded-xl w-[250px]'>
            Submit
          </button>

        </form>
      </Modal>
    </div>
  );
};

export default Customer;
