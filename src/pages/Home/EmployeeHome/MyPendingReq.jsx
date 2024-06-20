import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../firebase/FirebaseProvider";
import { ToastContainer, toast } from "react-toastify";


const MyPendingReq = () => {
  const {user} = useContext(AuthContext)
const email = user?.email
  const {data:pendingAsset={}, isPending, refetch} = useQuery({
    queryKey:['pending asset'],
    
    queryFn: async()=>{
    const res = await axios.get(`http://localhost:5000/pending-request/${email}`)
    return res.data
    }
    });

    const handleCancelAsset = async(id) =>{
      const res = await axios.delete(`http://localhost:5000/delete-req/${id}`)
      
      refetch()
    }

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold">My Pending Request :</h2>
      <div className="mt-8">
      <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Requested Date
          </th>
          <th>Request Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
        pendingAsset && pendingAsset?.map(asset=> <tr key={asset._id}>
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
          <td>{asset?.status}</td>
          <td>
            <div
            onClick={()=>handleCancelAsset(asset?._id)}
              className="border w-fit px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] rounded-lg">
              Cancel
            </div>

          </td>

        </tr>)
        }


      </tbody>


    </table>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyPendingReq;