import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <DefaultLayout>{children}</DefaultLayout>
);

export default DashboardLayout;
