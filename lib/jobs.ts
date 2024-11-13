import { APIJobCommentType, APIJobType } from "@/types/job";
import { getAuthHeaders } from "./auth";
import { JobFormSchema } from "@/schemas/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchJobWithComments = async (id: string) => {
  try {
    const [jobRes, commentsRes] = await Promise.all([
      fetch(`${API_URL}jobs/${id}`, { cache: "no-store" }),
      fetch(`${API_URL}jobs/${id}/comments`, { cache: "no-store" }),
    ]);

    if (jobRes.status === 404) {
      return { error: { message: "Job not found" }, status: jobRes.status };
    }

    if (!jobRes.ok || (!commentsRes.ok && commentsRes.status !== 404)) {
      // 404 means no comments yet
      return {
        error: {
          message: !jobRes.ok
            ? "An error occured fetching job"
            : "An error occured fetching job comments",
        },
        status: !jobRes.ok ? jobRes.status : commentsRes.status,
      };
    }

    const [{ data: job }, { data: comments }] = (await Promise.all([
      jobRes.json(),
      commentsRes.status === 404 ? { data: [] } : commentsRes.json(),
    ])) as [{ data: APIJobType }, { data: Array<APIJobCommentType> }];

    return { data: { ...job, replies: comments }, status: jobRes.status };
  } catch (e) {
    console.log(e);
    return { error: { message: "An error occured" } };
  }
};

export const fetchJobs = async ({ page }: { page: number }) => {
  try {
    const res = await fetch(`${API_URL}jobs/?page=${page}`, { cache: "no-store" });

    if (!res.ok) {
      return {
        error: {
          message: "An error occured fetching jobs",
        },
        status: res.status,
      };
    }

    const { data } = (await res.json()) as {
      data: {
        results: Array<APIJobType>;
        count: number;
        page: number;
        next: boolean;
        prev: boolean;
      };
    };
    return { data };
  } catch (e) {
    console.log(e);
    return { error: { message: "An error occured" } };
  }
};

export const likeJob = async (jobID: string) => {
  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${API_URL}jobs/${jobID}/likes`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders },
    });

    if (!res.ok) {
      return {
        error: {
          message: "An error occured liking job",
        },
        status: res.status,
      };
    }

    const data = (await res.json()) as {
      message: string;
      statusCode: number;
    };
    return { data, status: res.status };
  } catch (e) {
    console.log(e);
    return { error: { message: "An error occured liking job" } };
  }
};

export const createJob = async (data: JobFormSchema) => {
  const {
    jobTitle,
    startDate,
    endDate,
    description,
    instructionField,
    rewardPerParticipant,
    maxParticipants,
    socialActions,
    customActions,
  } = data;

  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${API_URL}jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({
        title: jobTitle,
        description,
        startDate: startDate.toISOString().slice(0, 10), // just the date e.g  2024-10-30
        endDate: endDate.toISOString().slice(0, 10), // just the date e.g  2024-10-30
        instruction: instructionField,
        maxParticipants,
        reward: rewardPerParticipant,
        socialActions,
        customActions,
      }),
    });

    if (!res.ok) {
      return {
        error: {
          message: "An error occured creating job",
        },
        status: res.status,
      };
    }

    const { data } = await res.json();

    return { data, status: res.status };
  } catch {
    return {
      error: {
        message: "An error occured creating job",
      },
    };
  }
};
