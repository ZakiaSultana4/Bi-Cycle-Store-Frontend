/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/products/productApi";
import { IBikeResponse } from "@/types/types";

import { Label } from "@radix-ui/react-dropdown-menu";
import CustomInputField from "@/components/CustomInputField";

// Define validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  image: z.string().min(1, "Image is required."),
  description: z.string().min(1, "Description is required."),
  brand: z.string().min(1, "Brand is required."),
  price: z.number().min(1, "Price cannot be 0."),
  quantity: z.number().min(1, "Quantity cannot be 0."),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  model: z.string().min(1, "Model is required."),
});

const EditProductDetails = ({ product }: { product: IBikeResponse }) => {
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Apply validation schema
    defaultValues: {
      name: "",
      image: "",
      description: "",
      brand: "",
      price: 0,
      quantity: 0,
      category: "Mountain", // Use a valid enum value as default
      model: "",
    },
  });

  const { reset } = form;
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (file: File) => {
    setImage(file);
  };

  useEffect(() => {
    reset({
      name: product?.name || "",
      image: product.image || "",
      description: product.description || "",
      brand: product.brand || "",
      price: product.price || 0,
      quantity: product.quantity || 0,
      category: product.category || "",
      model: product.model || "",
    });
  }, [product, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating product...");
    try {
      let imageUrl =data?.image;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bikeStore");
  
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dmvw2gidg/image/upload",
            { method: "POST", body: formData }
          );
          const result = await response.json();
          if (!result.secure_url) throw new Error("Image upload failed");
          imageUrl = result.secure_url;
        } catch (error) {
          toast.error("Failed to upload image");
          return;
        }
      }
      const updateData={...data,image:imageUrl}
      const res = await updateProduct({ data:updateData, id: product._id });

      if ("error" in res) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Product updated successfully!", { id: toastId });
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };
  const handleDeleteProduct = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteProduct(id);
      if (res?.error) {
        toast.error("Something went wrong...", { id: toastId });
      } else {
        toast.success("Deleted Product...", { id: toastId });
      }
    } catch (error) {
      toast.error("Delete Failed...", { id: toastId });
    }
  };

  return (
    <div className="flex items-center gap-2 ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setOpen(!open)}>
            <FaEdit className="text-black cursor-pointer  mx-auto hover:scale-[1.15] w-4 h-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-amber-100 mt-3">
          <DialogTitle className=" bg-amber-400 text-center text-white py-2 mt-3 rounded-t-md">Update This Product</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md mx-auto w-full"
            >
              <CustomInputField
                name="name"
                label="Bike Name"
                placeholder="Enter product name"
                type="text"
                control={form.control}
              />

              {/* <CustomInputField
                name="image"
                label="Product Image Link"
                placeholder="Enter image link"
                type="text"
                control={form.control}
              /> */}
              {/* image upload  */}
              <Label className="mt-2">Product Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageChange(file);
                  }
                }}
                
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Mountain">Mountain</SelectItem>
                            <SelectItem value="Road">Road</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <CustomInputField
                name="model"
                label="Bike Model"
                placeholder="Enter bike model"
                type="text"
                control={form.control}
              />

              <CustomInputField
                name="brand"
                label="Brand Name"
                placeholder="Enter brand name"
                type="text"
                control={form.control}
              />

              <div className="flex gap-4 justify-between items-center">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Button
              variant={"outline"}
                type="submit"
                className="w-full bg-primary-black hover:shadow-md rounded bg-amber-400"
              >
                Update Product
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <FaTrash
        onClick={() => handleDeleteProduct(product._id)}
        className="text-red-600  cursor-pointer  mx-auto hover:scale-[1.15] w-4 h-4"
      />
    </div>
  );
};

export default EditProductDetails;