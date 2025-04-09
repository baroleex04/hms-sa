import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[]; // Sửa lỗi ở đây
  category: string;
  brand: string;
  rate: number;
  stock: number;
  is_active: boolean;
}

const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://devapi.uniscore.vn/uri/api/products");

  // ✅ Đảm bảo data luôn là một mảng
  return Array.isArray(data.data) ? data.data : [];
};

const useGetAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 600000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export { useGetAllProducts };
