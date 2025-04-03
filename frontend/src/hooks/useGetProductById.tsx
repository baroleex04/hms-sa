import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "./useGetAllProducts"; // Import lại interface Product

const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const { data } = await axios.get(`https://devapi.uniscore.vn/uri/api/products/${id}`);
    console.log("datadata:", data); // Debug API response
    return data.data[0] || null; // Trả về null nếu không có dữ liệu
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const useGetProductById = (id: number) => {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Chỉ fetch nếu id tồn tại
    staleTime: 600000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export { useGetProductById };
