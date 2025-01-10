import { CheckFollowing } from "@/actions/follow";
import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import type { ErrorResponse, SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";

type FollowResponse = SuccessResponse<UserProps[]> | ErrorResponse | undefined;

export const getFollowers = async (
  userId: string | undefined,
): Promise<FollowResponse> => {
  const user = await assertUserAuthenticated();
  const fetchFollowers = makeFetch<SuccessResponse<UserProps[]>>(
    "auth",
    `auth/${userId}/followers`,
    user?.accessToken.value,
    {
      next: {
        tags: ["followers"],
      },
    },
  );

  try {
    const response = await fetchFollowers();
    if ("data" in response) {
      return response as SuccessResponse<UserProps[]>;
    }
    return response as ErrorResponse;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getFollowees = async (
  userId: string | undefined,
): Promise<FollowResponse> => {
  const user = await assertUserAuthenticated();
  const fetchFollowees = makeFetch<
    SuccessResponse<UserProps[]> | ErrorResponse
  >("auth", `auth/${userId}/followees`, user?.accessToken.value, {
    next: {
      tags: ["followees"],
    },
  });

  try {
    const response = await fetchFollowees();
    if ("data" in response) {
      return response as SuccessResponse<UserProps[]>;
    }
    return response as ErrorResponse;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
export const isFollowing = async (followId: string) => {
  const user = await assertUserAuthenticated();
  return await CheckFollowing(user.accessToken.value as string, followId);
};
