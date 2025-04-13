import EmptyLayout from "@/components/Layouts/EmptyLayout";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <EmptyLayout>{children}</EmptyLayout>
);

export default AuthLayout;
