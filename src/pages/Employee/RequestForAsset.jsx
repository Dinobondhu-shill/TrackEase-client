import { useQuery } from "@tanstack/react-query";
import useRoll from "../../hooks/useRoll";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../firebase/FirebaseProvider";
import moment from "moment";


const RequestForAsset = () => {
const [companyDetails] = useRoll()
const company = companyDetails[2]
const {user} = useContext(AuthContext)
const requestedDate = moment().format('YYYY-MM-DD');


const {data:allAsset={}, isPending, refetch} = useQuery({
queryKey:[company, 'assets'],

queryFn: async()=>{
const encodedCompany = encodeURIComponent(company);
const res = await axios.get(`http://localhost:5000/asset/employee/${encodedCompany}`)
return res.data
}
});

if(isPending) return <span
  className="loading block mx-auto pt-52 text-6xl text-center loading-spinner text-info "></span>
// add request for asset 
const handleRequestAsset =(event)=>{
event.preventDefault();
const note = event.target.note.value

}
return (
<div className="py-24 px-24 flex flex-col ">
  <h2 className="text-3xl font-semibold text-center underline">Request for asset to HR</h2>
  <div className="overflow-x-auto pt-24 ">
    <table className="table ">
      {/* head */}
      <thead>
        <tr>
          <th>Asset Name</th>
          <th>Asset Type</th>
          <th>Availability
          </th>
          <th>Request</th>
        </tr>
      </thead>
      <tbody>
        {
        allAsset && allAsset.map(asset=> <tr key={asset._id}>
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
          <td>{
            asset?.quantity>0 ? "Available" : "Out of Stock"
            }</td>
          <th>
            <div>
              <Link onClick={()=>document.getElementById('my_modal_3').showModal()}>
              <button className={`${asset.quantity> 0 ? '' : 'disabled'} border py-2 px-4 rounded-md
                hover:bg-slate-400`}>Request</button>
              </Link>

              {/* modal */}
              <dialog id="my_modal_3" className="modal text-center">
                <div className="modal-box">
                  <h2 className="text-center text-xl font-normal mt-3 mb-5">Write your note here for this asset to the HR</h2>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                 
                  </form>
                  <form onSubmit={handleRequestAsset}>
                  <input type="text" name="note" placeholder="Write Note for the asset..." className="input input-bordered w-full max-w-xs" required/>
                    <br />
                    <input value="request" type="submit" className="border px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer  border-[#92e0e3]  mt-6  rounded-lg "></input>
                  </form>
                  
                </div>
              </dialog>
            </div>
          </th>
        </tr>)
        }


      </tbody>


    </table>
  </div>
</div>
);
};

export default RequestForAsset;