import {
  Breadcrumb as ShadCnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { titleCase } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((s) => s.length > 0);

  return (
    <ShadCnBreadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <>
            <BreadcrumbItem>
              {index < paths.length - 1 ? (
                <BreadcrumbLink
                  href={`/${paths.filter((_, i) => i <= index).join("/")}`}
                >
                  {titleCase(path)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{titleCase(path)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </ShadCnBreadcrumb>
  );
};
