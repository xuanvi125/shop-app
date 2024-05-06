import React, { useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as ProductService from "../services/ProductService";

export function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyWord] = React.useState("");
  const [suggestion, setSuggestion] = React.useState([]);
  const [searchParams] = useSearchParams();
  const suggestionRef = React.useRef(null);
  const onChange = ({ target }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("keyword", target.value);
    setKeyWord(target.value);
    ProductService.searchBook(searchParams).then((data) =>
      setSuggestion(data.data)
    );
  };
  function handleClick() {
    suggestionRef.current.classList.add("hidden");
    navigate(`/user/search?keyword=${keyword}`);
  }
  function handleToggle(name) {
    setKeyWord(name);
    setSuggestion([]);
  }
  useEffect(() => {
    setKeyWord(searchParams.get("keyword") || "");
  }, [searchParams]);
  return (
    <div className="relative mx-auto  w-full max-w-[25rem] ">
      <div className="relative">
        <Input
          type="text"
          label="Search for a book"
          value={keyword}
          required
          onChange={onChange}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />

        <div
          ref={suggestionRef}
          className={`${
            keyword ? "block" : "hidden"
          } absolute left-0 mt-1 w-ful bg-white shadow-md max-h-60 overflow-auto z-20`}
        >
          {suggestion?.map((el) => {
            return (
              <Link
                onClick={() => handleToggle(el.name)}
                to={`/user/product/${el._id}`}
                key={el._id}
                className="p-2 flex flex-col"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
      <Button
        size="sm"
        color={keyword ? "gray" : "blue-gray"}
        disabled={!keyword}
        className="!absolute right-1 top-1 rounded"
        onClick={handleClick}
      >
        Search
      </Button>
    </div>
  );
}
