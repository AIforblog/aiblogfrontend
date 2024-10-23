import type React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonSize = "small" | "medium" | "large";
type ButtonColor = "primary" | "secondary" | "success" | "danger" | "warning";
type ButtonVariant = "solid" | "outline" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	color?: ButtonColor;
	icon?: LucideIcon;
	variant?: ButtonVariant;
	children: React.ReactNode;
}

export default function Button({
	size = "medium",
	color = "primary",
	icon: Icon,
	variant = "solid",
	disabled = false,
	className,
	children,
	...props
}: ButtonProps) {
	const sizeClasses = {
		small: "px-2 py-1 text-sm rounded-[20px]",
		medium: "px-4 py-2 text-base rounded-[40px] h-12",
		large: "px-6 py-3 text-lg rounded-[50px]",
	};

	const colorClasses = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		secondary: "bg-[#FDC316] text-white hover:bg-[#FDC316]/90",
		success: "bg-green-500 text-white hover:bg-green-600",
		danger: "bg-red-500 text-white hover:bg-red-600",
		warning: "bg-yellow-500 text-white hover:bg-yellow-600",
	};

	const variantClasses = {
		solid: colorClasses[color],
		outline: `bg-transparent border border-${color} text-${color} hover:bg-${color} hover:text-white`,
		text: `bg-transparent text-${color} hover:bg-${color}/10`,
	};

	const baseClasses =
		"rounded-md font-semibold focus:outline-none transition-colors duration-200";
	const disabledClasses = "opacity-50 cursor-not-allowed";

	const buttonClasses = cn(
		baseClasses,
		sizeClasses[size],
		variantClasses[variant],
		disabled && disabledClasses,
		className,
	);

	return (
		<button className={buttonClasses} disabled={disabled} {...props}>
			<span className="flex items-center justify-center">
				{Icon && (
					<Icon
						className={cn("w-5 h-5", children && "mr-2")}
						aria-hidden="true"
					/>
				)}
				{children}
			</span>
		</button>
	);
}
