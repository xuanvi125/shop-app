import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import * as accountService from "../services/accountService";
import toast from "react-hot-toast";
export default function AddAccountDialog({ setAccounts }) {
  const [open, setOpen] = React.useState(false);
  const [beneficiaryName, setBeneficiaryName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const handleOpen = () => setOpen((cur) => !cur);
  async function handleAddAccount() {
    const data = await accountService.addAccount({
      beneficiaryName,
      accountNumber,
    });
    if (data.status === "success") {
      toast.success("Account added successfully!");
      setAccounts((prev) => [...prev, data.data]);
    } else {
      toast.error(data.message);
    }

    handleOpen();
  }
  return (
    <>
      <Button onClick={handleOpen}>ADD BANK ACCOUNT</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              ADD BANK ACCOUNT
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Your Information
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Benifical Name
            </Typography>
            <Input
              label="Name"
              size="lg"
              onChange={(e) => setBeneficiaryName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Account Number
            </Typography>
            <Input
              label="Number"
              maxLength={10}
              minLength={10}
              onChange={(e) => setAccountNumber(e.target.value)}
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleAddAccount} fullWidth>
              ADD ACCOUNT
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
