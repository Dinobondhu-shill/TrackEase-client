import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AssetList = () => {
  const [filter, setFilter] = useState([])
  const [filter2, setFilter2] = useState([])
  const [sort, setSort] = useState([])
  const [search, setSearch] = useState([])

  const {data:assets={}, isPending} = useQuery({
    queryKey:['assets'],
    
    queryFn: async()=>{
      const res = await axios.get(`http://localhost:5000/assets`)
      return res.data
    }
    });
    
    const handleSerch = (e) =>{
      e.preventDefault()
      const searchText = e.target.search.value
    setSearch(searchText)
    }

    if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>

  return (
    <div className="pt-24 px-16">
      <h2 className="text-3xl font-bold text-center underline">All Asset Of Your Company</h2>
      <div className="">
        {/* search bar and filter section */}
     <div className="flex justify-between items-center">
     <div className="dropdown dropdown-hover">
  <select
    onChange={e => setFilter(e.target.value)}
    name='status'
    id="status"
    value={filter}
    className="absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
      <option disabled value="">Stock Status</option>
    <option value="available">Available</option>
    <option value="stock-out">Out Of Stock</option>
  </select>
</div>
<div className="dropdown dropdown-hover">
  <select
    onChange={e => setFilter2(e.target.value)}
    name='type'
    id="type"
    value={filter2}
    className="absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
      <option disabled value="">Product Type</option>
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-returnable</option>
  </select>
</div>
<div className="dropdown dropdown-hover">
  <select
    onChange={e => setSort(e.target.value)}
    name='sort'
    id="sort"
    value={sort}
    className="absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
      <option disabled value="">Sort By</option>
    <option value="returnable">High to low</option>
    <option value="non-returnable">Low to high</option>
  </select>
</div>
<form onSubmit={handleSerch} 
className="input input-bordered mt-5 flex items-center gap-2">
  <input type="text" name="search" className="grow" placeholder="Search" />
  <button type="submit"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 z-10"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
</form>
     </div>
      <div className="overflow-x-auto pt-24">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Product Type</th>
        <th>Product Quantity
        </th>
        <th>Added Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
       assets && assets.map(asset=> <tr key={asset._id}>
          <td>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{asset?.product}</div>
              </div>
            </div>
          </td>
          <td>
            {asset?.productType}
          </td>
          <td>{asset?.quantity}</td>
            <td>{asset?.addedDate}</td>
          <th>
            <div className="flex gap-2 text-2xl ">
              <span data-tip='Edit'  className="border-r-2 pr-3 tooltip text-[#85adb2da]"><FaEdit /></span>
              <span data-tip='Delete' className="pl-3 text-3xl tooltip text-[#ce1e1eda]"><MdDelete /></span>
            </div>
          </th>
        </tr>)
      }
      
     
    </tbody>

    
  </table>
</div>
      </div>
    </div>
  );
};

export default AssetList;