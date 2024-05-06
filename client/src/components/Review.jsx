import { useEffect, useState } from "react";
import * as ProductService from "../services/ProductService";
import Pagination from "./Pagination";
import ReviewItem from "./ReviewItem";
import { Button, Rating } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";
function Review({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const handleCreateReview = () => {
    ProductService.createReview({ bookId, review, rating }).then((data) => {
      window.location.reload();
    });
  };
  const handleDeleteReview = async (id) => {
    await ProductService.deleteReview(id);
    toast.success("Review Deleted");
    setReviews(reviews.filter((review) => review._id !== id));
  };
  const { user } = useAuth();
  useEffect(() => {
    if (!bookId) return;
    ProductService.getReviews(bookId).then((data) => {
      setTotalPages(data.totalPages);
      setReviews(data.data);
    });
  }, [bookId]);
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="font-bold">REVIEW</span>
      {reviews?.length === 0 ? (
        <div>No Reviews Yet</div>
      ) : (
        <div className="self-start">
          {reviews?.map((review) => (
            <div key={review._id} className="flex items-center">
              <ReviewItem key={review._id} review={review} />
              {review.user._id == user._id && (
                <TrashIcon
                  cursor="pointer"
                  onClick={() => handleDeleteReview(review._id)}
                  color="red"
                  className="w-4 h-4"
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="self-start w-full mt-6">
        <form className=" mx-auto w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your reviews
          </label>
          <Rating value={3} onChange={(value) => setRating(value)} />
          <textarea
            onChange={(event) => setReview(event.target.value)}
            id="message"
            rows="2"
            className="w-full block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a reviews..."
          ></textarea>
        </form>
        <Button
          color="blue"
          onClick={handleCreateReview}
          className="mt-3"
          size="sm"
        >
          CREATE REVIEW
        </Button>
      </div>
      {reviews?.length === 0 ? null : (
        <div>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

export default Review;
