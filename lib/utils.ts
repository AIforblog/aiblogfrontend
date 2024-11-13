import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function slugify(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

export function matchSlug(slug1: string, slug2: string): boolean {
  const normalizeSlug = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  return normalizeSlug(slug1) === normalizeSlug(slug2);
}

// Function to capitalize the first letter
export const capitalizeFirstLetter = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to lowercase the first letter
export const lowercaseFirstLetter = (string: string): string => {
	return string.charAt(0).toLowerCase() + string.slice(1);
};

export const sentenceCase = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const lowerCase = (str: string): string => {
	return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str: string): string => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

// Function to format likes, comments, views
export function formatViews(views: number): string {
	if (views < 1_000) return views.toString();
	if (views < 1_000_000) return (views / 1_000).toFixed(0) + "K";
	return (views / 1_000_000).toFixed(0) + "M";
}

// Function to format timestamps
export function formatTime(timestamp: number): string {
	const now = Date.now();
	const seconds = Math.floor((now - timestamp) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) {
		return "just now";
	} else if (minutes === 1) {
		return "1 min ago";
	} else if (minutes < 60) {
		return `${minutes} mins ago`;
	} else if (hours === 1) {
		return "1 hr ago";
	} else if (hours < 24) {
		return `${hours} hrs ago`;
	} else if (days === 1) {
		return "1 day ago";
	} else if (days < 30) {
		return `${days} days ago`;
	} else if (weeks === 1) {
		return "1 week ago";
	} else if (weeks < 52) {
		return `${weeks} weeks ago`;
	} else if (months === 1) {
		return "1 month ago";
	} else if (months < 12) {
		return `${months} months ago`;
	} else if (years === 1) {
		return "1 year ago";
	} else {
		return `${years} years ago`;
	}
}
