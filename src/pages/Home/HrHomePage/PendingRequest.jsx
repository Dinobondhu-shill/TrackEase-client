import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { Link } from "react-router-dom";


const PendingRequest = () => {

const [items, setItems] = useState(5)

const {data:reqAssets={}, isPending, refetch} = useQuery({
queryKey:['assets'],

queryFn: async()=>{
const res = await axios.get('http://localhost:5000/requested-assets')
return res.data
}
});
if(reqAssets.length === 0 ) return <div>
  <div className="pt-24">
    <h2 className="text-3xl font-semibold">Your Pending Request :</h2>

    <div className="py-10 font-bold text-3xl">You don't have any asset request</div>
  </div>
</div>

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


if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>
return (
<div>
  <h2 className="text-3xl font-semibold">Your Pending Request :</h2>

  <div className="my-4">
    <div className="overflow-x-auto pt-4">
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
          reqAssets && reqAssets.slice(0, items)?.map(asset=> <tr key={asset._id}>
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

                <div onClick={()=>handleApprove(asset?._id, asset.assetId)}
                  className="cursor-pointer">
                  <FaCheck className="text-green-400 " />
                </div>

                <div className="divider lg:divider-horizontal"></div>
                <div onClick={()=>handleDelete(asset?.assetId)}
                  className="cursor-pointer">
                  <GiCrossMark className="text-red-400  ml-3" />
                </div>

              </div>
            </td>
          </tr>)
          }


        </tbody>


      </table>
    </div>
  </div>
  <Link to={'/all-request'} className="border px-3 py-2 rounded-lg">See All Request</Link>
</div>
);
};

export default PendingRequest;