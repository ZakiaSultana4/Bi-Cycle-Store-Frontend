import  { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";

import CustomInputField from "@/components/CustomInputField";
import BackHome from "@/components/shared/navbar/BackHome";

// Validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function LoginPreview() {
  const [darkMode, setDarkMode] = useState(false); // simple dark mode toggle state
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(selectCurrentUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token);
      dispatch(setUser({ user: user, token: res?.data.token }));
      toast.success("Logged in successful", { id: toastId, duration: 2000 });
      navigate(location?.state || "/", { replace: true });
    } catch {
      toast.error("Email or password incorrect!", { id: toastId, duration: 2000 });
    }
  }

  if (token) {
    return <BackHome message="You Are Already Logged In!" />;
  }

  return (
    <div
      className={`h-[100vh] grid place-content-center ${
        darkMode
          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
          : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
      }`}
    >
      {/* Toggle dark mode button for demo */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-5 right-5 px-4 py-2 rounded border"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <Card className="mx-auto w-full md:w-96 lg:w-96 relative">
        <p
          onClick={() => navigate("/")}
          className="border inline font-bold shadow-md hover:shadow-sm hover:cursor-pointer px-3 py-1 rounded-full absolute top-0 right-0 m-2"
        >
          X
        </p>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 ">
                <CustomInputField
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  control={form.control}
                  className={`${darkMode ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)] border border-gray-600" : ""}`}
                />
                <CustomInputField
                  name="password"
                  label="Password"
                  placeholder="*****"
                  type="password"
                  control={form.control}
                  className={`${darkMode ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)] border border-gray-600" : ""}`}
                />

                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
                <Button type="submit" className="w-full bg-teal-500 text-white">
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm ">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
