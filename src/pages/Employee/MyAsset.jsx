import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/FirebaseProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



const MyAsset = () => {
const {user} = useContext(AuthContext)
const email = user?.email
const [filter2, setFilter2] = useState([])
const [filter, setFilter] = useState([])
const [search, setSearch] = useState([])


const handleSerch = (e) =>{
e.preventDefault()
const searchText = e.target.search.value
setSearch(searchText)
}

const {data:myAssets={}, isPending, refetch} = useQuery({
queryKey:['requested assets', filter, filter2, search],

queryFn: async()=>{
const res = await axios.get(`https://track-ease-server.vercel.app/my-asset/${email}`,
  {
    params: { filter, filter2, search},
  }
)
return res.data
}
});

const handleCancelAsset = async(id) =>{
  const res = await axios.delete(`https://track-ease-server.vercel.app/delete-req/${id}`)
  toast('Asset has been canceled')
  refetch()
}

const handleReturn = async(id, assetId) =>{
  const status = 'returned'
  const approvedDate = ''
  const updateDoc = {status, assetId, approvedDate}
const res = await axios.patch(`https://track-ease-server.vercel.app/return-asset/${id}`, updateDoc)
if(res.data.result.modifiedCount>0 && res.data.updateMainAsset.modifiedCount>0){
  toast('Request has been approved')
}
}

if(myAssets.length === 0 ) return <div>
<div className="pt-24 px-12">
<h2 className="md:text-3xl text-xl font-semibold text-center underline">Your Requested Assets</h2>

<div className="py-20 font-bold text-center md:text-3xl text-xl">You Haven't any requested Asset</div>
</div></div>

if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>

return (
<div className="pt-24 px-2 md:px-20">
  <h2 className="md:text-3xl text-xl font-semibold text-center underline">Your Requested Assets</h2>
  {/* search bar and filter section */}
  <div className="flex flex-col md:flex-row justify-between items-center">

    <div className="dropdown dropdown-hover">
      <select onChange={e=> setFilter2(e.target.value)}
        name='type'
        id="type"
        value={filter2}
        className="md:absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
        <option disabled value="">Product Type</option>
        <option value="returnable">Returnable</option>
        <option value="non-returnable">Non-returnable</option>
      </select>
    </div>
    <ToastContainer></ToastContainer>
    <div className="dropdown dropdown-hover">
      <select onChange={e=> setFilter(e.target.value)}
        name='sort'
        id="sort"
        value={filter}
        className="md:absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
        <option disabled value="">Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
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
              className="border w-fit px-6 py-2 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
              Cancel
            </div>
            ) : asset?.status === 'approved' && asset?.productType === 'returnable' ? (
              <div className="flex gap-4 my-3">
                <Link to={`/print-asset-details/${asset._id}`}
                  className="border w-fit px-6  py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg"> Print
                </Link >
                <div
                onClick={()=>handleReturn(asset._id, asset?.assetId)}
                  className="border w-fit px-6 py-2 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
                  Return
                </div>
              </div>
              ) : asset?.status === 'approved' ? (
            <div>
              <Link to={`/print-asset-details/${asset._id}`}
                className="border w-fit px-6 py-2 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
                Print
              </Link >
            </div>
            ) : asset?.status === 'rejected' ? (
            <div
              className=" font-bold cursor-not-allowed border-gray-200 rounded-lg">
              Rejected
            </div>
            ) : <button 
              className="border disabled w-fit  px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-not-allowed border-[#92e0e3]  rounded-lg">
              Returend
            </button>}

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