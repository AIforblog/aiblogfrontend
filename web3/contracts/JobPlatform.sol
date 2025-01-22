// aiblogfrontend\web3\contracts\JobPlatform.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract JobPlatform is ReentrancyGuard, Ownable, Pausable {
    // Structs
    struct Job {
        uint256 jobId;
        address employer;
        uint256 payment;
        bool isActive;
        bool isCompleted;
        bool isPaid;
        uint256 deadline;
        address worker;
        uint256 createdAt;
        bytes32 jobHash; // Hash of off-chain job details
    }

    struct Dispute {
        uint256 jobId;
        address initiator;
        string reason;
        bool isResolved;
        uint256 createdAt;
    }

    // State variables
    uint256 private jobCounter;
    uint256 private platformFee = 25; // 2.5% gas fee
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => uint256[]) public employerJobs;
    mapping(address => uint256[]) public workerJobs;
    
    // Events
    event JobCreated(uint256 indexed jobId, address indexed employer, uint256 payment, bytes32 jobHash);
    event JobTaken(uint256 indexed jobId, address indexed worker);
    event JobCompleted(uint256 indexed jobId);
    event JobPaid(uint256 indexed jobId, address indexed worker, uint256 amount);
    event DisputeCreated(uint256 indexed jobId, address indexed initiator);
    event DisputeResolved(uint256 indexed jobId);
    
    constructor() {
        // OpenZeppelin 4.9.3 automatically sets msg.sender as owner
    }

    // Core functions
    function createJob(bytes32 _jobHash, uint256 _deadline) external payable whenNotPaused {
        require(msg.value > 0, "Payment must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        jobCounter++;
        uint256 jobId = jobCounter;

        jobs[jobId] = Job({
            jobId: jobId,
            employer: msg.sender,
            payment: msg.value,
            isActive: true,
            isCompleted: false,
            isPaid: false,
            deadline: _deadline,
            worker: address(0),
            createdAt: block.timestamp,
            jobHash: _jobHash
        });

        employerJobs[msg.sender].push(jobId);
        emit JobCreated(jobId, msg.sender, msg.value, _jobHash);
    }

    function takeJob(uint256 _jobId) external whenNotPaused {
        Job storage job = jobs[_jobId];
        require(job.isActive, "Job is not active");
        require(job.worker == address(0), "Job already taken");
        require(job.employer != msg.sender, "Cannot take own job");

        job.worker = msg.sender;
        workerJobs[msg.sender].push(_jobId);
        emit JobTaken(_jobId, msg.sender);
    }

    function completeJob(uint256 _jobId) external nonReentrant whenNotPaused {
        Job storage job = jobs[_jobId];
        require(job.worker == msg.sender, "Not the worker");
        require(!job.isCompleted, "Already completed");
        require(block.timestamp <= job.deadline, "Job expired");

        job.isCompleted = true;
        emit JobCompleted(_jobId);
    }

    function confirmAndPay(uint256 _jobId) external nonReentrant whenNotPaused {
        Job storage job = jobs[_jobId];
        require(job.employer == msg.sender, "Not the employer");
        require(job.isCompleted, "Job not completed");
        require(!job.isPaid, "Already paid");

        uint256 fee = (job.payment * platformFee) / 1000;
        uint256 workerPayment = job.payment - fee;

        job.isPaid = true;
        (bool success, ) = job.worker.call{value: workerPayment}("");
        require(success, "Payment failed");

        emit JobPaid(_jobId, job.worker, workerPayment);
    }

    function createDispute(uint256 _jobId, string calldata _reason) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.employer || msg.sender == job.worker, "Not involved in job");
        require(!job.isPaid, "Job already paid");

        disputes[_jobId] = Dispute({
            jobId: _jobId,
            initiator: msg.sender,
            reason: _reason,
            isResolved: false,
            createdAt: block.timestamp
        });

        emit DisputeCreated(_jobId, msg.sender);
    }

    // Admin functions
    function resolveDispute(uint256 _jobId, address _payoutAddress) external onlyOwner {
        Job storage job = jobs[_jobId];
        Dispute storage dispute = disputes[_jobId];
        require(!dispute.isResolved, "Dispute already resolved");
        require(!job.isPaid, "Job already paid");

        uint256 fee = (job.payment * platformFee) / 1000;
        uint256 payout = job.payment - fee;

        dispute.isResolved = true;
        job.isPaid = true;
        
        (bool success, ) = _payoutAddress.call{value: payout}("");
        require(success, "Payout failed");

        emit DisputeResolved(_jobId);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 100, "Fee too high"); // Max 10%
        platformFee = _newFee;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // View functions
    function getJob(uint256 _jobId) external view returns (Job memory) {
        return jobs[_jobId];
    }

    function getEmployerJobs(address _employer) external view returns (uint256[] memory) {
        return employerJobs[_employer];
    }

    function getWorkerJobs(address _worker) external view returns (uint256[] memory) {
        return workerJobs[_worker];
    }

    function getDispute(uint256 _jobId) external view returns (Dispute memory) {
        return disputes[_jobId];
    }
}