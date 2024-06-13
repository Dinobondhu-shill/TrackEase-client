import { useContext } from "react";
import { AuthContext } from "../firebase/FirebaseProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRoll = () => {
  const { user } = useContext(AuthContext)

 const {data:role={}, isPending:isHrLoading} = useQuery({
  queryKey:[user?.email, 'role'],
  enabled:!!user, 
  queryFn: async()=>{
    const res = await axios.get(`http://localhost:5000/users/${user?.email}`)
    return [res?.data?.role, res.data.imageUrl2, res.data?.company, res?.data?.
      packages, res.data?.name]
  }
 })
 return [role, isHrLoading]
};

export default useRoll;