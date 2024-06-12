import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useRoll from "../../hooks/useRoll";
import { GrUserWorker } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";


const MyTeam = () => {
  const [role] = useRoll()
  const company = role[2]
  console.log(company)

  const {data:members={}, isPending,} = useQuery({
    queryKey:[company, 'assets'],
    
    queryFn: async()=>{
      const encodedCompany = encodeURIComponent(company);
      const res = await axios.get(`http://localhost:5000/users/team/${encodedCompany}`)
      return res.data
    }
    });

    if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>
  return (
    <div className="py-24 px-24">
       <h2 className="text-3xl font-semibold text-center underline">Meet Your Team</h2>
       <div>
       <div className="overflow-x-auto pt-10 " >
  <table className="table">
    <tbody>

      {
        members && members.map((member, index)=>  <tr key={member._id} className="flex justify-around items-center">
          <td>{index+1}</td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={member.imageUrl} alt="" />
                </div>
              </div>
              <div>
                <div className="font-bold">{member.name}</div>
              </div>
            </div>
          </td>
          <td className="px-5 text-2xl text-center">
            {
              member.role==='hr' ? <div data-tip='HR' className="tooltip"><RiAdminFill  /></div> :<div data-tip='Employee' className="tooltip"> <GrUserWorker /></div> 
            }
          </td>
          
        </tr>)
      }
     
    </tbody>
  
    
  </table>
</div>
       </div>
    </div>
  );
};

export default MyTeam;