import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/FirebaseProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const MyAsset = () => {
const {user} = useContext(AuthContext)
const email = user?.email
const [filter2, setFilter2] = useState([])
const [sort, setSort] = useState([])
const [search, setSearch] = useState([])


const handleSerch = (e) =>{
e.preventDefault()
const searchText = e.target.search.value
setSearch(searchText)
}

const {data:myAssets={}, isPending, refetch} = useQuery({
queryKey:['requested assets'],

queryFn: async()=>{
const res = await axios.get(`http://localhost:5000/my-asset/${email}`)
return res.data
}
});

const handleCancelAsset = async(id) =>{
  const res = await axios.delete(`http://localhost:5000/delete-req/${id}`)
  console.log(res.data)
  refetch()
}

if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>

return (
<div className="pt-24 px-20">
  <h2 className="text-3xl font-semibold text-center underline">Your Requested Assets</h2>
  {/* search bar and filter section */}
  <div className="flex justify-between items-center">

    <div className="dropdown dropdown-hover">
      <select onChange={e=> setFilter2(e.target.value)}
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
      <select onChange={e=> setSort(e.target.value)}
        name='sort'
        id="sort"
        value={sort}
        className="absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
        <option disabled value="">Sort By</option>
        <option value="returnable">Pending</option>
        <option value="non-returnable">Approved</option>
      </select>
    </div>
    <form onSubmit={handleSerch} className="input input-bordered mt-5 flex items-center gap-2">
      <input type="text" name="search" className="grow" placeholder="Search by assets name" />
      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          className="w-5 h-5 opacity-70 z-10">
          <path fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" /></svg></button>
    </form>
  </div>
  {/* assets data mapping */}
  <div className="overflow-x-auto pt-24">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Requested Date
          </th>
          <th>Approved Date</th>
          <th>Request Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
        myAssets && myAssets?.map(asset=> <tr key={asset._id}>
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
          <td>{asset?.requestedDate}</td>
          <td>{asset?.approvedDate ? asset?.approvedDate : '-'}</td>
          <td>{asset?.status}</td>
          <td>
            { asset?.status === 'pending' ? (
            <div
            onClick={()=>handleCancelAsset(asset?._id)}
              className="border w-fit px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
              Cancel
            </div>
            ) : asset?.status === 'approved' && asset?.productType === 'returnable' ? (
              <div className="flex gap-4">
                <div
                  className="border w-fit px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
                  Print
                </div>
                <div
                  className="border w-fit px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3]  rounded-lg">
                  Return
                </div>
              </div>
              ) : asset?.status === 'approved' ? (
            <div>
              <div
                className="border w-fit px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
                Print
              </div>
            </div>
            ) : asset?.status === 'rejected' ? (
            <div
              className=" font-bold cursor-not-allowed border-gray-200 rounded-lg">
              Rejected
            </div>
            ) : ''}

          </td>

        </tr>)
        }


      </tbody>


    </table>
  </div>
</div>
);
};

export default MyAsset;