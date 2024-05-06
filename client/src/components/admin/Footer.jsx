import { Typography } from '@material-tailwind/react'

export default function Footer() {
  return (
    <footer className="relative w-full">
      <div className="mt-12 w-full items-center 
                    justify-center border-t  
                    py-4 md:flex-row md:justify-between">
        <Typography
          variant="small"
          className="mb-4 text-center font-normal opacity-50
          text-blue-gray-900 md:mb-0"
        >
          &copy; {new Date().getFullYear()} Book Shop App. All rights reserved.
        </Typography>
      </div>
    </footer>
  )
}

export { Footer }