import { Button, Card, Typography } from "@material-tailwind/react";
import AddAccountDialog from "../components/AddAccountDialog";
import * as accountService from "../services/accountService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const TABLE_HEAD = [
  "ID",
  "Beneficiary Name",
  "Account Number",
  "Balance",
  "Actions",
];

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await accountService.getAccounts();
        setAccounts(accounts.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccounts();
  }, []);
  const handleDeleteAccount = async (id) => {
    await accountService.deleteAccount(id);
    toast.success("Account deleted successfully!");
    setAccounts((prev) => prev.filter((account) => account._id !== id));
  };
  if (accounts.length === 0) {
    return (
      <div className="container mx-auto mt-4 flex flex-col">
        <Typography variant="h4" className="m-3">
          MY BANK ACCOUNTS
        </Typography>
        <div className="self-end">
          <AddAccountDialog setAccounts={setAccounts} />
        </div>
        <Card className="container mx-auto mt-3 min-h-96">
          <Typography variant="h6" color="blue-gray" className="text-center">
            You have no bank accounts yet.
          </Typography>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <Typography variant="h4" className="m-3">
        MY BANK ACCOUNTS
      </Typography>
      <div className="self-end">
        <AddAccountDialog />
      </div>
      <Card className="container mx-auto mt-3">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map(
              ({ beneficiaryName, accountNumber, balance, _id }, index) => {
                const isLast = index === accounts.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {beneficiaryName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {accountNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(balance)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteAccount(_id)}
                        color="red"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
