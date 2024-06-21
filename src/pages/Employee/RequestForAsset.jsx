import { useQuery } from "@tanstack/react-query";
import useRoll from "../../hooks/useRoll";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/FirebaseProvider";
import moment from "moment";
import Swal from "sweetalert2";

const RequestForAsset = () => {
  const [companyDetails] = useRoll();
  const company = companyDetails[2];
  console.log(companyDetails)
  const { user } = useContext(AuthContext);
  const requestedDate = moment().format('YYYY-MM-DD');
  const requesterEmail = user?.email;
  const requesterName = user?.displayName;
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [filter, setFilter] = useState('')
  const [filter2, setFilter2] = useState('')
  const [search, setSearch] = useState('')

  const { data: allAsset = [], isPending, refetch } = useQuery({
    queryKey: [company, 'assets', filter, filter2, search],
    queryFn: async () => {
      const encodedCompany = encodeURIComponent(company);
      const res = await axios.get(`http://localhost:5000/asset/employee/${encodedCompany}`, {
        params: { filter, filter2, search},
      });
      return res.data;
    }
  });
  console.log(allAsset)

  if (isPending) return <span className="loading block mx-auto pt-52 text-6xl text-center loading-spinner text-info"></span>;

  // handle request for asset
  const handleRequestAsset = async (id, event, product, productType) => {
    event.preventDefault();
    const note = event.target.note.value;
    const status = 'pending';
    
    const requestAsset = { note, requestedDate, status, requesterEmail, requesterName, product, productType , company, assetId:id};

    try {
      const res = await axios.post(`http://localhost:5000/request-for-asset`, requestAsset);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request has been sent",
          showConfirmButton: false,
          timer: 2000
        });
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  const openModal = (id) => {
    setSelectedAssetId(id);
    document.getElementById(`modal_${id}`).showModal();
  };

    const closeModal = () => {
    if (selectedAssetId) {
      document.getElementById(`modal_${selectedAssetId}`).close();
      setSelectedAssetId(null);
    }
  };
  const handleSerch = (e) =>{
    e.preventDefault()
    const searchText = e.target.search.value
  setSearch(searchText)
  }
  return (
    <div className="py-24 md:px-24 flex flex-col">
      <h2 className="text-3xl font-semibold text-center underline">Request for asset to HR</h2>
        {/* search bar and filter section */}
     <div className="flex flex-col md:flex-row justify-between items-center">
     <div className="dropdown dropdown-hover">
     <select
              onChange={e => setFilter(e.target.value)}
              name='status'
              id="status"
              value={filter}
              className="md:absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
              <option disabled value="">Stock Status</option>
              <option value="1">Available</option>
              <option value="0">Out Of Stock</option>
            </select>
</div>
<div className="dropdown dropdown-hover">
  <select
    onChange={e => setFilter2(e.target.value)}
    name='type'
    id="type"
    value={filter2}
    className="md:absolute z-10 inset-x-0 mt-1 bg-base-100 border rounded-md w-52">
      <option disabled value="">Product Type</option>
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-returnable</option>
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
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {allAsset && allAsset.map(asset => (
              <tr key={asset._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{asset?.product}</div>
                    </div>
                  </div>
                </td>
                <td>{asset?.productType}</td>
                <td>{asset?.quantity > 0 ? "Available" : "Out of Stock"}</td>
                <th>
                  <div>
                    <button
                     onClick={() => openModal(asset._id)}
                      className={`${asset.quantity > 0 ? '' : 'disabled'} border py-2 px-4 rounded-md hover:bg-slate-400`}
                    >
                      Request
                    </button>

                    <dialog id={`modal_${asset._id}`} className="modal text-center">
                      <div className="modal-box">
                        <h2 className="text-center text-xl font-normal mt-3 mb-5">Write your note here for this asset to the HR</h2>
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        </form>
                        <form onSubmit={(event) => handleRequestAsset(asset._id, event, asset.product, asset.productType)}>
                          <input type="text" name="note" placeholder="Write Note for the asset..." className="input input-bordered w-full max-w-xs" required />
                          <br />
                          <input value="request" type="submit" className="border px-6 py-3 hover:bg-[#92e0e3] font-bold cursor-pointer border-[#92e0e3] mt-6 rounded-lg" />
                        </form>
                      </div>
                    </dialog>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestForAsset;
