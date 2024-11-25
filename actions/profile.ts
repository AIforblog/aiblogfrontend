import makeFetch from "@/lib/helper";
import type { SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";

export const getUserProfile = async (accessToken: string, userId: string) => {
  try {
    const fetchUserProfile = makeFetch<SuccessResponse<UserProps>>(
      "general",
      `/auth/profile/${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      }
    );

    return await fetchUserProfile();
  } catch (err) {
    console.error(err);
  }
};