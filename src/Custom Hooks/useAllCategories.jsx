import axios from "axios";
import { useQuery } from "react-query";

export default function useAllCategories() {
    //hold shared logic
    //  name must start with use + must include a react hook
  const AllCategories = () =>{
      return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: "AllCategories",
    queryFn: AllCategories
  })

  // object
    return res;

}
