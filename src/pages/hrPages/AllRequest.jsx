import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

const AllRequest = () => {


const {data:reqAssets={}, isPending, refetch} = useQuery({
queryKey:['assets'],

queryFn: async()=>{
const res = await axios.get('http://localhost:5000/requested-assets')
return res.data
}
});

const handleApprove = async(id) =>{
  const status = 'approved'
  const approvedDate = moment().format('YYYY-MM-DD');
 const updateDoc = {status, approvedDate}
  const res = await axios.patch(`http://localhost:5000/approve-asset/${id}`, updateDoc)
  console.log(res.data)
  // if(res.data.modifiedCount>0){
  //   alert('Request has been approved')
  // }
 
}

if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>

return (
<div className="pt-24 px-12">
  <h2 className="text-3xl font-semibold text-center underline">Request For Assets</h2>

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
        reqAssets && reqAssets.map(asset=> <tr key={asset.assetId}>
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
              onClick={()=>handleApprove(asset.assetId)}
               className="cursor-pointer">
              <FaCheck className="text-green-400 "/>
              </div>
              <div className="divider lg:divider-horizontal"></div> 
             <div className="cursor-pointer"> <GiCrossMark className="text-red-400  ml-3"/></div>

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