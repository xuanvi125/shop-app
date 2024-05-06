import { useState, useEffect } from "react";
import { AccountForm } from "../../components/admin/AccountForm";

export function EditAccount() {
  const [accountID, setAccountID] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    setAccountID(id);
  }, []);

  return <AccountForm accountID={accountID} />;
}

export default EditAccount;
