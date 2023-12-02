import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordInput } from "../components/Input";
import { useGlobalContext } from "../context/GlobalContext";

const LoginPage: React.FC = () => {
  const { login } = useGlobalContext();

  const formSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(25, { message: "Name cannot be more than 25 characters" }),

    password: z
      .string()
      .min(6, { message: "Password should contain atleast 6 characters" }),
  });

  type ValidationSchema = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      login(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <main>
      <section className="container">
        <h1 className="page-heading">Venue Admin Login</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="Username"
            type="text"
            placeholder="Username"
            {...register("username")}
            error={errors.username && errors.username.message}
          />
          <PasswordInput
            id="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password && errors.password.message}
          />
          <button className="login-button" type="submit">
            Sign in
          </button>
        </form>
        <Link to={"/"} className="navigation-link">
          New Registration?
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
