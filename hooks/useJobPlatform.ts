// Commented out the entire file because the import on line 9 and 10 do not exist until after the contract has been deployed,
// so they were causing build issues on github.
// You can uncomment it after you have deployed the smart contract and use the functions there

// // hooks/useJobPlatform.ts
// import {
//   useReadContract,
//   useWriteContract,
//   useWatchContractEvent,
// } from "wagmi";
// import { CONTRACT_ADDRESS } from "../web3/contracts/addresses";
// import JobPlatformABI from "../web3/contracts/abis/JobPlatform.json";
// import { parseEther, stringToHex } from "viem";
// import { keccak256, toBytes, Log } from "viem";

// // New type for job data
// export type JobData = {
//   title: string;
//   description: string;
//   startDate?: string;
//   endDate?: string;
//   reward: string;
//   maxParticipants?: number;
//   instruction?: string;
//   socialActions?: string[];
//   customActions?: string[];
// };

// type JobDetails = {
//   title: string;
//   description: string;
//   requirements: string[];
//   // Add other relevant fields
// };

// // Define types for the event logs based on the contract events
// // type ParsedLog<T> = Omit<Log, "args"> & {
// //   args: T;
// // };

// type JobCreatedLog = Log & {
//   args: {
//     jobId: bigint;
//     employer: `0x${string}`;
//     payment: bigint;
//     jobHash: `0x${string}`;
//   };
// };

// type JobTakenLog = Log & {
//   args: {
//     jobId: bigint;
//     worker: `0x${string}`;
//   };
// };

// type JobCompletedLog = Log & {
//   args: {
//     jobId: bigint;
//   };
// };

// type EventCallbacks = {
//   onJobCreated?: (logs: any[]) => void;
//   onJobTaken?: (logs: any[]) => void;
//   onJobCompleted?: (logs: any[]) => void;
// };

// // Hook to watch for job events
// export const useWatchJobEvents = (
//   jobId?: number,
//   callbacks?: EventCallbacks
// ) => {
//   useWatchContractEvent({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     eventName: "JobCreated",
//     onLogs: (logs) => {
//       const parsedLogs = logs as JobCreatedLog[];
//       const relevantLogs = jobId
//         ? parsedLogs.filter((log) => log.args.jobId === BigInt(jobId))
//         : parsedLogs;
//       console.log("New job created:", relevantLogs);
//       callbacks?.onJobCreated?.(relevantLogs);
//     },
//   });

//   useWatchContractEvent({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     eventName: "JobTaken",
//     onLogs: (logs) => {
//       const parsedLogs = logs as JobTakenLog[];
//       const relevantLogs = jobId
//         ? parsedLogs.filter((log) => log.args.jobId === BigInt(jobId))
//         : parsedLogs;
//       console.log("Job taken:", relevantLogs);
//       callbacks?.onJobTaken?.(relevantLogs);
//     },
//   });

//   useWatchContractEvent({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     eventName: "JobCompleted",
//     onLogs: (logs) => {
//       const parsedLogs = logs as JobCompletedLog[];
//       const relevantLogs = jobId
//         ? parsedLogs.filter((log) => log.args.jobId === BigInt(jobId))
//         : parsedLogs;
//       console.log("Job completed:", relevantLogs);
//       callbacks?.onJobCompleted?.(relevantLogs);
//     },
//   });
// };

// // Hook to generate job hash
// export const useGenerateJobHash = () => {
//   const generateHash = (jobData: JobData) => {
//     // Create a deterministic string from job data
//     const hashInput = JSON.stringify({
//       title: jobData.title,
//       description: jobData.description,
//       startDate: jobData.startDate,
//       endDate: jobData.endDate,
//       reward: jobData.reward,
//       maxParticipants: jobData.maxParticipants,
//       instruction: jobData.instruction,
//       socialActions: jobData.socialActions,
//       customActions: jobData.customActions,
//     });

//     // Use viem's keccak256 for hash generation (compatible with Solidity)
//     return keccak256(toBytes(hashInput));
//   };

//   return { generateHash };
// };

// // Create a new instance of a job on the  blockchain
// export const useCreateJob = () => {
//   const { writeContract, status, error } = useWriteContract();

//   const createJob = async (
//     jobDetails: JobDetails,
//     payment: string,
//     deadline: number
//   ) => {
//     const jobHash = stringToHex(JSON.stringify(jobDetails), { size: 32 });

//     return writeContract({
//       address: CONTRACT_ADDRESS.baseSepolia,
//       abi: JobPlatformABI,
//       functionName: "createJob",
//       args: [jobHash, BigInt(deadline)],
//       value: parseEther(payment),
//     });
//   };

//   return {
//     createJob,
//     isLoading: status === "pending",
//     isSuccess: status === "success",
//     error,
//   };
// };

// // Get a job
// export const useGetJob = (jobId: number) => {
//   const { data, isError, isLoading } = useReadContract({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     functionName: "getJob",
//     args: [BigInt(jobId)],
//   });

//   return { job: data, isError, isLoading };
// };

// // Worker takes a job
// export const useTakeJob = () => {
//   const { writeContract, status, error } = useWriteContract();

//   const takeJob = async (jobId: number) => {
//     return writeContract({
//       address: CONTRACT_ADDRESS.baseSepolia,
//       abi: JobPlatformABI,
//       functionName: "takeJob",
//       args: [BigInt(jobId)],
//     });
//   };

//   return {
//     takeJob,
//     isLoading: status === "pending",
//     isSuccess: status === "success",
//     error,
//   };
// };

// // To tag the job as completed
// export const useCompleteJob = () => {
//   const { writeContract, status, error } = useWriteContract();

//   const completeJob = async (jobId: number) => {
//     return writeContract({
//       address: CONTRACT_ADDRESS.baseSepolia,
//       abi: JobPlatformABI,
//       functionName: "completeJob",
//       args: [BigInt(jobId)],
//     });
//   };

//   return {
//     completeJob,
//     isLoading: status === "pending",
//     isSuccess: status === "success",
//     error,
//   };
// };

// // Employer comfirms job is completed and pays worker
// export const useConfirmAndPay = () => {
//   const { writeContract, status, error } = useWriteContract();

//   const confirmAndPay = async (jobId: number) => {
//     return writeContract({
//       address: CONTRACT_ADDRESS.baseSepolia,
//       abi: JobPlatformABI,
//       functionName: "confirmAndPay",
//       args: [BigInt(jobId)],
//     });
//   };

//   return {
//     confirmAndPay,
//     isLoading: status === "pending",
//     isSuccess: status === "success",
//     error,
//   };
// };

// // Create a dispute if either worker or employer is dissatisfied
// export const useCreateDispute = () => {
//   const { writeContract, status, error } = useWriteContract();

//   const createDispute = async (jobId: number, reason: string) => {
//     return writeContract({
//       address: CONTRACT_ADDRESS.baseSepolia,
//       abi: JobPlatformABI,
//       functionName: "createDispute",
//       args: [BigInt(jobId), reason],
//     });
//   };

//   return {
//     createDispute,
//     isLoading: status === "pending",
//     isSuccess: status === "success",
//     error,
//   };
// };

// // Get dispute details
// export const useGetDispute = (jobId: number) => {
//   const { data, isError, isLoading } = useReadContract({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     functionName: "getDispute",
//     args: [BigInt(jobId)],
//   });

//   return { dispute: data, isError, isLoading };
// };

// // Get employer jobs
// export const useGetEmployerJobs = (employerAddress: string) => {
//   const { data, isError, isLoading } = useReadContract({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     functionName: "getEmployerJobs",
//     args: [employerAddress as `0x${string}`],
//   });

//   return { jobs: data, isError, isLoading };
// };

// // Get worker jobs
// export const useGetWorkerJobs = (workerAddress: string) => {
//   const { data, isError, isLoading } = useReadContract({
//     address: CONTRACT_ADDRESS.baseSepolia,
//     abi: JobPlatformABI,
//     functionName: "getWorkerJobs",
//     args: [workerAddress as `0x${string}`],
//   });

//   return { jobs: data, isError, isLoading };
// };

// // Add more hooks as you need them...
