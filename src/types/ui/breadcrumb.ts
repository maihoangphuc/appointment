import * as React from "react";

export type BreadcrumbProps = React.HTMLAttributes<HTMLElement>;
export type BreadcrumbListProps = React.OlHTMLAttributes<HTMLOListElement>;
export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>;
export type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>;
export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>;
export type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}