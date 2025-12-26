import { useContext } from "react";
import { CartContext } from "./Content/CartContent.jsx";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    mrp: 45,
    discountPercent: 5,
    image:
      "https://media.istockphoto.com/id/1359178154/photo/acetaminophen-ibuprofeno-pill-box-box-paper-blister-tablets.jpg?s=612x612&w=0&k=20&c=rLMJ3W3zEQoig3A-R9yGbnQKjWKXua6NvnX0JbZcpwg=",
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    mrp: 120,
    discountPercent: 8,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/341035/azithromycin_500mg_tablet_3_s_0.jpg",
  },
  {
    id: 3,
    name: "Cough Syrup",
    mrp: 110,
    discountPercent: 10,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/341527/benadryl_cough_syrup_150ml_0.jpg",
  },
  {
    id: 4,
    name: "Vitamin C Tablets",
    mrp: 180,
    discountPercent: 12,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/405040/limcee_chewable_tablet_orange_500mg_15s_0.jpg",
  },
  {
    id: 5,
    name: "Pain Relief Gel",
    mrp: 95,
    discountPercent: 7,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/340089/volini_pain_relief_gel_30gm_0.jpg",
  },
  {
    id: 6,
    name: "Digital Thermometer",
    mrp: 250,
    discountPercent: 15,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/412171/dr_morepen_digital_thermometer_mt_222_0.jpg",
  },
  {
    id: 7,
    name: "Blood Pressure Monitor",
    mrp: 1999,
    discountPercent: 18,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/409146/dr_morepen_bp_02_bp_monitor_0.jpg",
  },
  {
    id: 8,
    name: "Face Mask (Pack of 50)",
    mrp: 299,
    discountPercent: 20,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/958289/3_ply_face_mask_pack_of_50_0.jpg",
  },
  {
    id: 9,
    name: "Hand Sanitizer 500ml",
    mrp: 199,
    discountPercent: 14,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/858601/dettol_hand_sanitizer_original_500_ml_0.jpg",
  },
  {
    id: 10,
    name: "Glucometer",
    mrp: 1499,
    discountPercent: 16,
    image:
      "https://www.netmeds.com/images/product-v1/600x600/412216/dr_morepen_gluco_one_bg_03_glucometer_0.jpg",
  },
];


export default function ShopPage() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const discountedPrice = Math.round(
              product.mrp -
                (product.mrp * product.discountPercent) / 100
            );

            return (
              <div
                key={product.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />

                <h3 className="font-medium text-sm mb-1">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 line-through">
                  ₹{product.mrp}
                </p>

                <p className="text-gray-800 font-semibold">
                  ₹{discountedPrice}
                </p>

                <p className="text-green-600 text-xs mb-3">
                  {product.discountPercent}% Off
                </p>

                <div className="mt-auto flex gap-2">
                 <button
  onClick={() => {
    addToCart({
      ...product,
      price: discountedPrice,
    });
    navigate("/cart"); // 👈 cart auto open
  }}
  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Add to Cart
</button>


                 <button
 
  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
>
  Buy Now
</button>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
