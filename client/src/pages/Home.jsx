import Banner from "../components/Banner";
import ItemByCategory from "../components/ItemByCategory";
import SoldOutItem from "../components/SoldOutItem";
function Home() {
  return (
    <div>
      <Banner />
      <SoldOutItem />
      <ItemByCategory />
    </div>
  );
}

export default Home;
