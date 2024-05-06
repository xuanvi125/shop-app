import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="flex max-w-screen mx-auto flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 ">
      <Typography color="blue-gray" className="font-normal text-center">
        &copy; 2023 Book Shop App
      </Typography>
    </footer>
  );
}
