import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";

export function ConfirmDeleteModal({ id, forceUpdate, deleteRow }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleConfirm = async () => {
    setOpen(false);
    toast.promise(
      deleteRow(id),
      {
        loading: "Deleting...",
        success: (data) => {
          forceUpdate();
          return "Deleted successfully";
        },
        error: (err) => {
          console.log(err);
          return "Something went wrong";
        },
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
  };

  return (
    <>
      <IconButton size="md" color="red" onClick={handleOpen}>
        <TrashIcon className="w-5 h-5" />
      </IconButton>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete This Item</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this item? This action cannot be
          reversed.
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleConfirm}>
            <span>Delete</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleOpen}
            className="ml-2"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
