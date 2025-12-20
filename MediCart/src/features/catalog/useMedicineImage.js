import { useQuery } from "@tanstack/react-query";
import { fetchMedicineImage } from "./imageApi";

export default function useMedicineImage(name) {
  return useQuery({
    queryKey: ["medicine-image", name],
    queryFn: () => fetchMedicineImage(name),
    staleTime: 1000 * 60 * 60 * 24 * 7, // cache 7 days
    retry: false,
  });
}
