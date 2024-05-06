import ProductCard from "./ProductCard";
function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 ">
      {books?.map((item) => (
        <ProductCard book={item} key={item._id} />
      ))}
    </div>
  );
}

export default BookList;
