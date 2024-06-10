import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import Select from 'react-select'
import Swal from 'sweetalert2';

const AddAsset = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'returnable', label: 'Returnable' },
    { value: 'non-returnable', label: 'Non-Returnable' },
  ]

  const handleAddAsset = (e) =>{
    e.preventDefault()
    const form = e.target
    const product = form.product.value
    const productType = selectedOption.value
    const quantity = parseInt(form.quantity.value)
    const addedDate = moment().format('LL');

    const asset = {product, productType, quantity, addedDate}
    // add asset data to the database
   axios.post('http://localhost:5000/add-asset', asset)
    .then(res=>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Asset has been added",
          showConfirmButton: false,
          timer: 2500
        });
      }
    })
    .catch(error => {
      console.error('Error adding asset:', error);
    });
  }

  return (
    <div className="pt-24 px-24 w-4/6 mx-auto">
      <h2 className="text-3xl font-bold text-center underline">Add An Asset</h2>
      <div className="my-10">
        <form onSubmit={handleAddAsset}>
          {/* full name field */}
      <div className="flex">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Enter Product Name*</span>
        </div>
        <input type="text" placeholder="Type here" name="product" className="input input-bordered w-full max-w-xs" required />
      </label>
      {/* image field */}
      {/* select option of package */}
      <label className="form-control w-full mt-1">
      <div className="label">
          <span className="label-text">Product Type*</span>
        </div>
       <div>
       <Select className="max-w-xs" 
       defaultValue={selectedOption}
       onChange={setSelectedOption}
       options={options} required/>
       </div>
      </label>
      </div>
      <label className="form-control  ">
        <div className="label">
          <span className="label-text">Product Quantity*</span>
        </div>
        <input type="number" placeholder="Type here" name="quantity" className="mr-10 input input-bordered " required />
      </label>
      <div className="mr-10">
      <input type="submit" value="Add Asset" className="border py-2 hover:bg-[#92e0e3] font-bold cursor-pointer  border-[#92e0e3] w-full my-6  rounded-lg "/>
      </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;