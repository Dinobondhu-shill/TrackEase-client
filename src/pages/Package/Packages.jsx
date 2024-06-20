import PackageCard1 from "../../components/PackageCard1";
import PackageCard2 from "../../components/PackageCard2";
import PackageCard3 from "../../components/PackageCard3";


const Packages = () => {

const handleIncreasePack = (pack, price, member)=>{
console.log(`purchased ${pack} price ${price} member ${member}`)
} 


  return (
    <div className="pt-24 px-16">
      <h2 className="text-3xl font-semibold text-center underline">Select an Package :</h2>
      <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <div className="h-full cursor-pointer" onClick={()=>handleIncreasePack('basic', 5, 5)}><PackageCard1></PackageCard1></div>
        <div className="h-full cursor-pointer" onClick={()=>handleIncreasePack('premium', 15, 20)}><PackageCard3></PackageCard3></div>
        <div className="h-full cursor-pointer" onClick={()=>handleIncreasePack('standard', 8, 10)}><PackageCard2></PackageCard2></div>
        
      </div>
    </div>
  );
};

export default Packages;