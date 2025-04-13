"use client";

import BaseForm from "@/components/BaseForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { FormFields } from "@/types/lib/form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const fields: FormFields[] = [
    {
      name: "username",
      label: "Username",
      type: "string",
      component: <Input allowClear placeholder="Enter username" />,
      validation: { required: true },
      messages: { required: "Vui lòng nhập tài khoản hợp lệ." },
    },
    {
      name: "password",
      label: "Password",
      type: "string",
      component: (
        <Input allowClear type="password" placeholder="Enter password" />
      ),
      validation: { required: true, min: 6 },
      messages: {
        required: "Vui lòng nhập mật khẩu.",
        min: "Mật khẩu phải có ít nhất 6 ký tự.",
      },
    },
  ];

  const form = useZodForm(fields, {
    initialValues: {
      username: "admin",
      password: "admin@123",
    },
  });

  const onSubmit = (values: any) => {
    toast({
      title: "Đăng nhập thành công",
      placement: "bottomRight",
    });

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-600">Please enter your login information</p>
        </div>

        <BaseForm
          form={form}
          fields={fields}
          onSubmit={onSubmit}
          id="loginForm"
        />

        <div className="text-center mt-4">
          <Button
            variant="default"
            type="submit"
            form="loginForm"
            className="w-full bg-light-primary dark:bg-dark-primary text-light-bg dark:text-dark-bg"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
