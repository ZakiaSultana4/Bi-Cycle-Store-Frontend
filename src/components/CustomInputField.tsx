import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./ui/password-input";


interface InputFieldProps<T extends FieldValues> {
  name: Path<T>; // Ensures that the name matches a field in your schema
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<T>; // Tied to the form's specific type
  className?: string; // Optional className for custom styling
}

const CustomInputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control,
  className,
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={`grid gap-2 ${className ?? ""}`}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            {type === "password" ? (
              <PasswordInput
                id={name}
                placeholder={placeholder}
                autoComplete="current-password"
                {...field}
              />
            ) : (
              <Input
                id={name}
                placeholder={placeholder}
                type={type}
                autoComplete={type === "email" ? "email" : "off"}
                {...field}
              />
            )}
          </FormControl>
          {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};


export default CustomInputField;