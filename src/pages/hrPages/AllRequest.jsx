import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

const AllRequest = () => {
  const [search, setSearch] = useState('')

const {data:reqAssets={}, isPending, refetch} = useQuery({
queryKey:['assets', search],

queryFn: async()=>{
const res = await axios.get(`http://localhost:5000/requested-assets?search=${search}`)
return res.data
}
});
if(reqAssets.length === 0 ) return <div>
  <div className="pt-24 px-12">
  <h2 className="text-3xl font-semibold text-center underline">Request For Assets</h2>

  <div className="py-20 font-bold text-center text-3xl">You don't have any asset request</div>
  </div></div>

const handleApprove = async(id, assetId) =>{
  const status = 'approved'
  const approvedDate = moment().format('YYYY-MM-DD');
 const updateDoc = {status, approvedDate, assetId}
  const res = await axios.patch(`http://localhost:5000/approve-asset/${id}`, updateDoc)
  console.log(res.data)
  if(res.data.result.modifiedCount>0 && res.data.updateMainAsset.modifiedCount>0){
    alert('Request has been approved')
  }
  refetch()
}

const handleDelete = async(id) =>{
  const status = 'rejected'
  const res = await axios.patch(`http://localhost:5000/reject-asset/${id}`, {status})
  console.log(res.data)
  if(res?.data.modifiedCount > 0){
    alert('Request has been rejected')
}
refetch()
}
const handleSerch = (e) =>{
  e.preventDefault()
  const searchText = e.target.search.value
setSearch(searchText)
}

if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>

return (
<div className="pt-24 px-12">
  <h2 className="text-3xl font-semibold text-center underline">Request For Assets</h2>
  <form onSubmit={handleSerch} 
className="input input-bordered mt-5 flex items-center gap-2 w-fit">
  <input type="text" name="search" className="grow" placeholder="Search by email or name" />
  <button type="submit"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 z-10"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
</form>
  {/* assets data mapping */}
  <div className="overflow-x-auto pt-24">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Email of requester</th>
          <th>Name of requester
          </th>
          <th>Requested Date
          </th>
          <th>Additonal Note</th>
          <th>Request Status</th>
          <th>Approve || Delete</th>
        </tr>
      </thead>
      <tbody>
        {
        reqAssets && reqAssets?.map(asset=> <tr key={asset._id}>
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
          <td>{asset?.requesterEmail
            }</td>
          <td>{asset?.requesterName
            }</td>
          <td>{asset?.
            requestedDate
            }</td>
          <td>
            {asset?.note}
          </td>
          <td>{asset?.status}</td>
            <td>
              <div className="flex gap-3 justify-center mr-3 text-2xl ">
              
                <div
                onClick={()=>handleApprove(asset?._id, asset.assetId)}
                 className="cursor-pointer">
                <FaCheck className="text-green-400 "/>
                </div> 
              
              <div className="divider lg:divider-horizontal"></div> 
             <div 
             onClick={()=>handleDelete(asset?.assetId)}
             className="cursor-pointer"> <GiCrossMark className="text-red-400  ml-3"/></div>

              </div>
            </td>
        </tr>)
        }


      </tbody>


    </table>
  </div>
</div>
);
};

export default AllRequest;