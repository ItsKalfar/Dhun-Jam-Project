import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, PasswordInput } from "../components/Input";
import { useGlobalContext } from "../context/GlobalContext";

const LoginPage: React.FC = () => {
  const { signin } = useGlobalContext();

  const formSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters.")
      .max(25, "Username cannot be more than 25 characters"),

    password: Yup.string().min(
      6,
      "Password should contain at least 6 characters"
    ),
  });

  type ValidationSchema = Yup.InferType<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      signin(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <main>
      <section className="container">
        <h1 className="page-heading">Venue Admin Login</h1>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="signin-button" type="submit">
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
