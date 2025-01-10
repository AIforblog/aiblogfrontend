import * as React from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1 rounded-md border p-1",
          className,
        )}
        {...props}
      />
    );
  },
);
Toolbar.displayName = "Toolbar";

export { Toolbar };
