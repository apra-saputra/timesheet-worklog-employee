import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import logo from "@/../public/login.svg";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";

const Login: React.FC = () => {
  const { toast } = useToast();

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);

    try {
      // await loginMutation.mutateAsync({
      //   email: form.email,
      //   password: form.password,
      // });

      setTimeout(() => {}, 1000);

      // setLoading(false);
      // navigate("/");
    } catch (error) {
      // setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    }
  };

  return (
    <section className="flex flex-col gap-2 justify-center w-full items-center h-screen">
      <Card className="min-w-[300px] sm:w-[400px] md:w-[567px] lg:w-[762px] xl:w-[1024px] overflow-hidden px-4 py-2">
        <h1 className="text-center text-4xl font-bold text-accent">
          Admin Worksheet
        </h1>
        <div className="grid grid-flow-col sm:grid-cols-2 grid-cols-1">
          <Image
            priority={false}
            src={logo}
            alt="Logo"
            loading="lazy"
            className="object-fit aspect-square hidden h-full md:block md:col-span-1 pl-4"
          />

          <LoginForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </Card>

      <span className="capitalize">
        <strong>© 2023</strong>
      </span>
    </section>
  );
};

export default Login;
