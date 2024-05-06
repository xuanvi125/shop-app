import { useEffect, useState } from "react";
import { ProductForm } from "../../components/admin/ProductForm";

export default function EditProduct() {
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    setProductId(productId);
  }, []);

  return <ProductForm productId={productId} />;
}
