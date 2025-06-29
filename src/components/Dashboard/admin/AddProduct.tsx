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
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import CustomInputField from "@/components/CustomInputField";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  image: z.array(z.any()).nonempty("At least one image is required."),
  description: z.string().min(1, "Description is required."),
  brand: z.string().min(1, "Brand is required."),
  price: z.number().min(1, "Price cannot be 0."),
  quantity: z.number().min(1, "Quantity cannot be 0."),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  riderType: z.enum(["Men", "Women", "Kids"], {
    errorMap: () => ({ message: "Rider type is required" }),
  }),
  model: z.string().min(1, "Model is required."),
});

interface AddProductProps {
  darkMode: boolean;
}

const AddProduct = ({ darkMode }: AddProductProps) => {
  const [open, setOpen] = useState(false);
  const [addProduct] = useCreateProductMutation();
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: [],
      description: "",
      brand: "",
      price: 0,
      quantity: 0,
      category: undefined,
      riderType: undefined,
      model: "",
    },
  });

  const { reset } = form;

  const removeImageAtIndex = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length > 0) {
        form.setValue("image", updated as [File, ...File[]], {
          shouldValidate: true,
        });
      } else {
        form.resetField("image");
      }
      return updated;
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const toastId = toast.loading("Uploading images...");

    if (!images.length) {
      toast.error("Please upload at least one image.", { id: toastId });
      return;
    }

    try {
      const imageUrls: string[] = [];

      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bikeStore");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmvw2gidg/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        if (result?.secure_url) {
          imageUrls.push(result.secure_url);
        }
      }

      if (!imageUrls.length) {
        toast.error("No images uploaded successfully.", { id: toastId });
        return;
      }

      const productData = {
        ...data,
        image: imageUrls,
        inStock: data.quantity > 0,
      };

      const res = await addProduct(productData);

      if (res?.data) {
        toast.success("Product added successfully!", { id: toastId });
        reset();
        setImages([]);
        setOpen(false);
      } else {
        toast.error("Failed to add product.", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload failed.", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className={`py-2 px-3 rounded hover:shadow-md cursor-pointer ${
            darkMode
              ? "bg-teal-700 text-[var(--primary-foreground)] hover:bg-gray-600"
              : "bg-teal-700 text-white hover:bg-teal-600"
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomInputField
              name="name"
              label="Bike Name"
              placeholder="Enter Product name"
              type="text"
              control={form.control}
            />

            {/* Image Upload + Preview */}
            <FormField
              control={form.control}
              name="image"
              render={({ fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const filesArray = Array.from(files);
                          setImages((prev) => {
                            const updated = [
                              ...prev,
                              ...filesArray.filter(
                                (file) =>
                                  !prev.some(
                                    (img) =>
                                      img.name === file.name &&
                                      img.size === file.size
                                  )
                              ),
                            ];
                            if (updated.length > 0) {
                              form.setValue("image", updated as [File, ...File[]], {
                                shouldValidate: true,
                              });
                            } else {
                              form.resetField("image");
                            }
                            return updated;
                          });
                        } else {
                          setImages([]);
                          form.resetField("image");
                        }
                      }}
                      className="block w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                  </FormControl>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}

                  {/* Preview Thumbnails with Remove and Click to Preview */}
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {images.map((file, idx) => {
                        const objectUrl = URL.createObjectURL(file);
                        return (
                          <div
                            key={idx}
                            className="relative w-16 h-16 rounded border overflow-hidden cursor-pointer"
                          >
                            <img
                              src={objectUrl}
                              alt={`preview-${idx}`}
                              className="w-full h-full object-cover"
                              onClick={() => setPreviewImage(objectUrl)}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImageAtIndex(idx);
                                URL.revokeObjectURL(objectUrl);
                              }}
                              className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1.5 text-xs font-bold hover:bg-red-700"
                              aria-label={`Remove image ${idx + 1}`}
                            >
                              &times;
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FormItem>
              )}
            />

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
                      className={darkMode ? "bg-gray-800 text-white" : ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category & Rider */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                     <SelectContent
  className={`${darkMode
    ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
    : "bg-white text-black"
  }`}
>
  <SelectGroup>
    <SelectItem
      value="Mountain"
      className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
    >
      Mountain
    </SelectItem>
    <SelectItem
      value="Road"
      className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
    >
      Road
    </SelectItem>
    <SelectItem
      value="Hybrid"
      className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
    >
      Hybrid
    </SelectItem>
    <SelectItem
      value="Electric"
      className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
    >
      Electric
    </SelectItem>
  </SelectGroup>
</SelectContent>

                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="riderType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rider Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Rider Type" />
                        </SelectTrigger>
                  <SelectContent
  className={`${
    darkMode
      ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
      : "bg-white text-black"
  }`}
>
  <SelectGroup>
    <SelectItem
      value="Men"
      className={`${
        darkMode
          ? "hover:bg-gray-700 text-[var(--primary-foreground)]"
          : "hover:bg-gray-100 text-black"
      }`}
    >
      Men's Bikes
    </SelectItem>
    <SelectItem
      value="Women"
      className={`${
        darkMode
          ? "hover:bg-gray-700 text-[var(--primary-foreground)]"
          : "hover:bg-gray-100 text-black"
      }`}
    >
      Women's Bikes
    </SelectItem>
    <SelectItem
      value="Kids"
      className={`${
        darkMode
          ? "hover:bg-gray-700 text-[var(--primary-foreground)]"
          : "hover:bg-gray-100 text-black"
      }`}
    >
      Kids' Bikes
    </SelectItem>
  </SelectGroup>
</SelectContent>

                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Model & Brand */}
            <CustomInputField
              name="model"
              label="Bike Model"
              placeholder="Model"
              type="text"
              control={form.control}
            />
            <CustomInputField
              name="brand"
              label="Brand Name"
              placeholder="Brand"
              type="text"
              control={form.control}
            />

            {/* Price & Quantity */}
            <div className="flex gap-4">
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                Add Product
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

      {/* Preview Modal using shadcn Dialog */}
      <Dialog open={Boolean(previewImage)} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0 overflow-hidden bg-transparent shadow-none">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <div className="relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 z-10 rounded-full bg-black bg-opacity-50 text-white p-1 hover:bg-opacity-75"
              aria-label="Close preview"
            >
              &times;
            </button>
            <img
              src={previewImage ?? ""}
              alt="Image preview"
              className="w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default AddProduct;
