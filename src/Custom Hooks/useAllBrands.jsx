import axios from "axios";
import { useQuery } from "react-query";

export default function useAllBrands() {

    function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

   const res = useQuery({
    queryKey: 'allBrands',
    queryFn: getAllBrands
   })

  return res;
}
