
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Select from 'react-select'
import Swal from "sweetalert2";

const UpdateAsset = () => {
const asset = useLoaderData()
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'returnable', label: 'Returnable' },
    { value: 'non-returnable', label: 'Non-Returnable' },
  ]
  const handleUpdateAsset = async (e) =>{
    e.preventDefault()
    const form = e.target
    const product = form.product.value
    const productType = selectedOption.value
    const quantity = parseInt(form.quantity.value)
    const updatedAsset = {product, productType, quantity}

    const res = await axios.put(`https://track-ease-server.vercel.app/update-assets/${asset?._id}`, updatedAsset);
    console.log(res.data);
    if(res.data.modifiedCount>0){
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Asset has been Updated",
        showConfirmButton: false,
        timer: 2000
      });
    }

  }
  return (
    <div className="pt-24 px-24 w-4/6 mx-auto">
      <h2 className="text-3xl font-bold text-center underline">Update Your Asset</h2>
      <div className="my-10">
        <form 
        onSubmit={handleUpdateAsset}
        >
          {/* full name field */}
      <div className="flex">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Enter Product Name*</span>
        </div>
        <input defaultValue={asset?.product} type="text" placeholder="Type here" name="product" className="input input-bordered w-full max-w-xs" required />
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
        <input defaultValue={asset?.quantity} type="number" placeholder="Type here" name="quantity" className="mr-10 input input-bordered " required />
      </label>
      <div className="mr-10">
      <input type="submit" value="Update Asset" className="border py-2 hover:bg-[#92e0e3] font-bold cursor-pointer  border-[#92e0e3] w-full my-6  rounded-lg "/>
      </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAsset;