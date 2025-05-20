import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderResponse, TProductDetails } from "@/types/types";


export type OrderItems = {
  quantity: number;
  product: TProductDetails;
}[];

export function OrderProductDetails({
  orderItems,
}: {
  orderItems: IOrderResponse;
}) {
  if (!orderItems) {
    return <p>No ordered products available.</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[120px] bg-gray-600 text-white cursor-pointer">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-amber-100">
        <DialogHeader>
          <DialogTitle>Ordered Product Details</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto bg-amber-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Buy QTY</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>In Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems?.products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{item?.product?.name}</TableCell>
                  <TableCell>{item?.product?.brand}</TableCell>
                  <TableCell>tk {item?.product?.price}</TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell> tk {item?.quantity * item?.product?.price}</TableCell>
                  <TableCell>
                    {item?.product?.inStock ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}