import { cn } from "cn";
import type { ComponentPropsWithRef } from "react";

export function Flex({ className, ...rest }: ComponentPropsWithRef<"div">) {
  return <div className={cn("flex", className)} {...rest} />;
}
export function FlexCenter({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...rest}
    />
  );
}

export function FlexColumn({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return <div className={cn("flex flex-col", className)} {...rest} />;
}

export function Grid({ className, ...rest }: ComponentPropsWithRef<"div">) {
  return <div className={cn("grid", className)} {...rest} />;
}
