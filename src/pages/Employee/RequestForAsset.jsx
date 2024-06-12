import { useQuery } from "@tanstack/react-query";
import useRoll from "../../hooks/useRoll";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../firebase/FirebaseProvider";
import moment from "moment";
import Swal from "sweetalert2";

const RequestForAsset = () => {
  const [companyDetails] = useRoll();
  const company = companyDetails[2];
  const { user } = useContext(AuthContext);
  const requestedDate = moment().format('YYYY-MM-DD');
  const requesterEmail = user?.email;
  const requesterName = user?.displayName;

  const { data: allAsset = [], isPending, refetch } = useQuery({
    queryKey: [company, 'assets'],
    queryFn: async () => {
      const encodedCompany = encodeURIComponent(company);
      const res = await axios.get(`http://localhost:5000/asset/employee/${encodedCompany}`);
      return res.data;
    }
  });

  if (isPending) return <span className="loading block mx-auto pt-52 text-6xl text-center loading-spinner text-info"></span>;

  // handle request for asset
  const handleRequestAsset = async (id, event) => {
    event.preventDefault();
    const note = event.target.note.value;
    const status = 'pending';
    const requestAsset = { note, requestedDate, status, requesterEmail, requesterName };

    try {
      const res = await axios.put(`http://localhost:5000/request-for-asset/${id}`, requestAsset);
      if (res.data.modifiedCount > 0) {
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

  const closeModal = () => {
    document.getElementById('my_modal_3').close();
  };

  return (
    <div className="py-24 px-24 flex flex-col">
      <h2 className="text-3xl font-semibold text-center underline">Request for asset to HR</h2>
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
                      onClick={() => document.getElementById('my_modal_3').showModal()}
                      className={`${asset.quantity > 0 ? '' : 'disabled'} border py-2 px-4 rounded-md hover:bg-slate-400`}
                    >
                      Request
                    </button>

                    <dialog id="my_modal_3" className="modal text-center">
                      <div className="modal-box">
                        <h2 className="text-center text-xl font-normal mt-3 mb-5">Write your note here for this asset to the HR</h2>
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        </form>
                        <form onSubmit={(event) => handleRequestAsset(asset._id, event)}>
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
