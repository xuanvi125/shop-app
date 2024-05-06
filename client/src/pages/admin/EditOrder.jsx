import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as OrderService from "../../services/orderService";
import toast from "react-hot-toast";
function EditOrder() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await OrderService.getOrder(orderId);
      setStatus(data.data.status);
      setOrder(data.data);
    };
    fetchOrder();
  }, [orderId]);

  const onSubmit = async (data) => {
    const res = await OrderService.updateOrder(orderId, data);
    if (res.status === "success") {
      toast.success("Order updated successfully");
      navigate("/admin/order");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <Typography variant="h4">Update Order</Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 mb-2 mx-auto w-full"
      >
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-3 flex flex-col gap-6">
              <Typography color="blue-gray" className="-mb-5 font-medium">
                User
              </Typography>
              <Input
                value={order.user?.name}
                name="user"
                disabled
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography color="blue-gray" className="-mb-5 font-medium">
                Order Date
              </Typography>
              <Input
                value={new Date(order.orderDate).toLocaleString()}
                disabled
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography color="blue-gray" className="-mb-5 font-medium">
                Shipping Address
              </Typography>
              <Input
                name="shippingAddress"
                autoFocus
                {...register("shippingAddress", { required: true })}
                defaultValue={order.shippingAddress}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography color="blue-gray" className="-mb-3 font-medium">
                Status
              </Typography>
              <select
                className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                {...register("status")}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <Button
              className="mt-6 max-w-[200px] mx-auto"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Update Order
            </Button>
          </div>
          <div>
            <Card className="container  p-3 mt-3">
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center"
              >
                ORDERED PRODUCTS
              </Typography>
              <List>
                {!order && null}
                {order.orderedProducts?.map((item) => (
                  <ListItem key={item._id}>
                    <ListItemPrefix>
                      <Avatar
                        variant="circular"
                        alt="candice"
                        src={item.product.image}
                      />
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {item.quantity} x{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.product.price)}
                        ={" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.quantity * item.product.price)}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" color="red" className="text-center">
                Total: {""}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.total)}
              </Typography>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditOrder;
