"use server";

import { CategoriesResponse } from "@/types/categories";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getCategories() {
  const cookieStore = cookies();

  try {
    const response = await axios.get<CategoriesResponse>(
      `${API_BASE_URL}blog/categories`,
    );

    if (!response.data || !response.data.data) {
      throw new Error("Invalid blog data received");
    }

    const { data } = response.data;
    // Store the blog data in cookies
    try {
      cookieStore.set("categories", JSON.stringify(data), {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour expiration
      });
    } catch (cookieError) {
      console.error("Error setting categories data cookie:", cookieError);
      // Continue execution even if cookie storage fails
    }

    return response.data;
  } catch (error) {
    console.log({ error });
    // Try to get data from cookies if API call fails
    const cachedData = cookieStore.get("categories");
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData.value);
        return {
          statusCode: 200,
          message: "Data retrieved from cache",
          data: parsedData,
        };
      } catch (parseError) {
        console.error("Error parsing cached category data:", parseError);
      }
    }
    throw error;
  }
}
