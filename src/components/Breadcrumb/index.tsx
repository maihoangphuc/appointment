"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const NextBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <Link href={href} passHref legacyBehavior>
                    <BreadcrumbLink
                      className={clsx(
                        pathNames.length === index + 1
                          ? "text-black dark:text-white"
                          : "text-muted-foreground dark:text-gray-400",
                        "hover:text-gray-700 dark:hover:text-gray-300"
                      )}
                    >
                      {link[0].toUpperCase() + link.slice(1)}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default NextBreadcrumb;
