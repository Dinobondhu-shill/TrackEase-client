import { useQuery } from "@tanstack/react-query";
import useRoll from "../../../hooks/useRoll";
import axios from "axios";


const LimitedStock = () => {
const [role] = useRoll()
const company =role[2]

const {data:assets=[]} = useQuery({
  queryKey: ['limited-asset', company],

queryFn: async()=>{
const res = await axios.get(`https://track-ease-server.vercel.app/limited-stock/${company}`)
return res.data
},
enabled: !!company, 
});


return (
<div className="mt-10">
  <h2 className="md:text-3xl text-xl font-semibold">Limited Stock Asset :</h2>
  <div className="my-4">
  <div className="overflow-x-auto pt-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
        assets && assets?.map(asset=> <tr key={asset._id}>
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
          </tr>)
          }


        </tbody>


      </table>
    </div>

  </div>
</div>
);
};

export default LimitedStock;