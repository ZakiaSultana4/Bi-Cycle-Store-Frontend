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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateProductMutation } from "@/redux/features/products/productApi";
import CustomInputField from "@/components/CustomInputField";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  image: z.string().optional(),
  description: z.string().min(1, "Description is required."),
  brand: z.string().min(1, "Brand is required."),
  price: z.number().min(1, "Price cannot be  0."),
  quantity: z.number().min(1, "Quantity cannot be 0."),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  model: z.string().min(1, "Model is required."),
});

interface AddProductProps {
  darkMode: boolean;
}

const AddProduct = ({ darkMode }: AddProductProps) => {
  const [open, setOpen] = useState(false);
  const [addProduct] = useCreateProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      brand: "",
      price: 0,
      quantity: 0,
      category: undefined,
      model: "",
    },
  });

  const { reset } = form;
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");

    try {
      if (!image)
        return toast.error("Please select an image first!", { id: toastId });

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bikeStore"); // Replace with your Cloudinary preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmvw2gidg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      const imageUrl = result.secure_url;

      const productData = {
        ...data,
        image: imageUrl,
      };

      const res = await addProduct(productData);

      if (res?.data) {
        toast.success("Product added successfully!", { id: toastId });
        reset();
        setOpen(false);
      } else if (res?.error) {
        toast.error("Failed to add product. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className={`py-2 px-3 rounded hover:shadow-md  cursor-pointer${
            darkMode
              ? " bg-gray-700 text-[var(--primary-foreground)]"
              : "bg-gray-800 text-white"
          }`}
        >
          Add Product
        </button>
      </DialogTrigger>

      <DialogContent
        className={`sm:max-w-[425px] ${
          darkMode
            ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
            : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
        }`}
      >
        <div
          className={`py-2 rounded-t-md mt-2 ${
            darkMode
              ? "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
              : "bg-amber-400 text-white"
          }`}
        >
          <DialogTitle className="text-lg font-semibold text-center">
            Add New Product
          </DialogTitle>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-md mx-auto w-full"
          >
            {/* Bike Name */}
            <CustomInputField
              name="name"
              label="Bike Name"
              placeholder="Enter Product name"
              type="text"
              control={form.control}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageChange(file);
                        }
                      }}
                      className={`${
                        darkMode
                          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                          : ""
                      }`}
                    />
                  </FormControl>
                  {error && (
                    <p className="text-red-500 dark:text-red-400">{error.message}</p>
                  )}
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      {...field}
                      className={`${
                        darkMode
                          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                          : ""
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={`${
                          darkMode
                            ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a Category" />
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
                </FormItem>
              )}
            />

            {/* Model */}
            <CustomInputField
              name="model"
              label="Bike Model"
              placeholder="Bike Model.."
              type="text"
              control={form.control}
            />

            {/* Brand */}
            <CustomInputField
              name="brand"
              label="Brand Name"
              placeholder="Enter Brand name"
              type="text"
              control={form.control}
            />

            <div className="flex gap-4 justify-between items-center ">
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={`${
                          darkMode
                            ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                            : ""
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Quantity"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                        className={`${
                          darkMode
                            ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                            : ""
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="submit"
                variant="default"
                className="mt-2 bg-amber-400 hover:bg-amber-500"
              >
                Add Product
              </Button>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
