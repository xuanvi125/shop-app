import { Typography } from "@material-tailwind/react";

function Banner() {
  return (
    <div>
      <img
        className="w-[900px] h-[500px] mx-auto"
        src="/images/Bookshop.gif"
      ></img>
      <div>
        <Typography
          as="h2"
          className="text-center text-3xl md:text-6xl font-bold mb-2"
        >
          Discover Your Next Favorite Book Here.
        </Typography>
        <Typography
          as="p"
          className="text-center text-sm md:text-2xl mb-4 text-[#455A64] font"
        >
          Explore our curated collection of new and popular books to find your
          next literary adventure.
        </Typography>
      </div>
    </div>
  );
}

export default Banner;
