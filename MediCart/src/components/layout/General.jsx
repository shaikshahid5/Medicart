import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { setSearchQuery } from "../../features/catalog/productSlice";
import { useDispatch, useSelector } from "react-redux";

const General = () => {
  const dispatch = useDispatch();
  const { q } = useSelector(
    (state) => state.products.search
  );

  return (
    <>
      <Navbar
        searchValue={q}
        onSearch={(val) => dispatch(setSearchQuery(val))}
      />
      <Outlet />
    </>
  );
};

export default General;