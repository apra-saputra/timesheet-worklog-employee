import React, { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSignUp, useSignIn, SignIn } from "@clerk/nextjs";

type FormType = {
  email: string;
  password: string;
};

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleChange,
  form,
}) => {
  const { signIn } = useSignIn();
  
  const innerSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    // console.log(signIn);
    // signIn
    return await handleSubmit(e)
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col justify-center md:px-6 px-2 col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>please submit your account.</CardDescription>
      </CardHeader>

      <form onSubmit={innerSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <div className="text-end text-sm cursor-pointer">
                <span onClick={() => setShowPassword((state) => !state)}>
                  {showPassword ? "hide" : "show"} password
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="reset">
            reset
          </Button>
          <div className="flex gap-2 items-center">
            {/* {loading && <MoonLoader color="#fff" size={25} />} */}
            <Button>Submit</Button>
          </div>
        </CardFooter>
      </form>
      {/* <SignIn/> */}
    </div>
  );
};

export default LoginForm;
