// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureVesta is SepoliaConfig {
    using FHE for *;
    
    struct VestingSchedule {
        euint32 vestingId;
        euint32 totalAmount;
        euint32 releasedAmount;
        euint32 vestingDuration;
        euint32 cliffDuration;
        euint32 vestingStartTime;
        euint32 vestingEndTime;
        bool isActive;
        bool isCliffPassed;
        string beneficiaryName;
        address beneficiary;
        address creator;
        uint256 createdAt;
    }
    
    struct VestingRelease {
        euint32 releaseId;
        euint32 amount;
        euint32 releaseTime;
        bool isReleased;
        address beneficiary;
        uint256 timestamp;
    }
    
    struct VestingCondition {
        euint32 conditionId;
        euint32 milestoneAmount;
        euint32 milestoneTime;
        bool isMilestoneBased;
        bool isTimeBased;
        bool isConditionMet;
        string conditionDescription;
        address conditionCreator;
        uint256 createdAt;
    }
    
    mapping(uint256 => VestingSchedule) public vestingSchedules;
    mapping(uint256 => VestingRelease) public vestingReleases;
    mapping(uint256 => VestingCondition) public vestingConditions;
    mapping(address => euint32) public beneficiaryReputation;
    mapping(address => euint32) public creatorReputation;
    mapping(address => uint256[]) public userVestingSchedules;
    
    uint256 public vestingCounter;
    uint256 public releaseCounter;
    uint256 public conditionCounter;
    
    address public owner;
    address public verifier;
    
    event VestingScheduleCreated(uint256 indexed vestingId, address indexed creator, address indexed beneficiary, string beneficiaryName);
    event VestingReleaseExecuted(uint256 indexed releaseId, uint256 indexed vestingId, address indexed beneficiary, uint32 amount);
    event VestingConditionMet(uint256 indexed conditionId, uint256 indexed vestingId, address indexed beneficiary);
    event VestingScheduleCompleted(uint256 indexed vestingId, address indexed beneficiary);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createVestingSchedule(
        address _beneficiary,
        string memory _beneficiaryName,
        externalEuint32 _totalAmount,
        externalEuint32 _vestingDuration,
        externalEuint32 _cliffDuration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_beneficiary != address(0), "Beneficiary cannot be zero address");
        require(bytes(_beneficiaryName).length > 0, "Beneficiary name cannot be empty");
        
        uint256 vestingId = vestingCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalTotalAmount = FHE.fromExternal(_totalAmount, inputProof);
        euint32 internalVestingDuration = FHE.fromExternal(_vestingDuration, inputProof);
        euint32 internalCliffDuration = FHE.fromExternal(_cliffDuration, inputProof);
        
        // Calculate vesting times
        euint32 vestingStartTime = FHE.asEuint32(uint32(block.timestamp));
        euint32 vestingEndTime = FHE.add(vestingStartTime, internalVestingDuration);
        
        vestingSchedules[vestingId] = VestingSchedule({
            vestingId: FHE.asEuint32(0), // Will be set properly later
            totalAmount: internalTotalAmount,
            releasedAmount: FHE.asEuint32(0),
            vestingDuration: internalVestingDuration,
            cliffDuration: internalCliffDuration,
            vestingStartTime: vestingStartTime,
            vestingEndTime: vestingEndTime,
            isActive: true,
            isCliffPassed: false,
            beneficiaryName: _beneficiaryName,
            beneficiary: _beneficiary,
            creator: msg.sender,
            createdAt: block.timestamp
        });
        
        // Add to user's vesting schedules
        userVestingSchedules[_beneficiary].push(vestingId);
        userVestingSchedules[msg.sender].push(vestingId);
        
        emit VestingScheduleCreated(vestingId, msg.sender, _beneficiary, _beneficiaryName);
        return vestingId;
    }
    
    function addVestingCondition(
        uint256 _vestingId,
        externalEuint32 _milestoneAmount,
        externalEuint32 _milestoneTime,
        bool _isMilestoneBased,
        bool _isTimeBased,
        string memory _conditionDescription,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vestingSchedules[_vestingId].creator != address(0), "Vesting schedule does not exist");
        require(vestingSchedules[_vestingId].isActive, "Vesting schedule is not active");
        require(msg.sender == vestingSchedules[_vestingId].creator || msg.sender == vestingSchedules[_vestingId].beneficiary, "Not authorized to add conditions");
        
        uint256 conditionId = conditionCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalMilestoneAmount = FHE.fromExternal(_milestoneAmount, inputProof);
        euint32 internalMilestoneTime = FHE.fromExternal(_milestoneTime, inputProof);
        
        vestingConditions[conditionId] = VestingCondition({
            conditionId: FHE.asEuint32(0), // Will be set properly later
            milestoneAmount: internalMilestoneAmount,
            milestoneTime: internalMilestoneTime,
            isMilestoneBased: _isMilestoneBased,
            isTimeBased: _isTimeBased,
            isConditionMet: false,
            conditionDescription: _conditionDescription,
            conditionCreator: msg.sender,
            createdAt: block.timestamp
        });
        
        return conditionId;
    }
    
    function executeVestingRelease(
        uint256 _vestingId,
        externalEuint32 _releaseAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vestingSchedules[_vestingId].creator != address(0), "Vesting schedule does not exist");
        require(vestingSchedules[_vestingId].isActive, "Vesting schedule is not active");
        require(msg.sender == vestingSchedules[_vestingId].beneficiary, "Only beneficiary can execute release");
        
        // Check if cliff period has passed
        VestingSchedule storage schedule = vestingSchedules[_vestingId];
        require(block.timestamp >= schedule.createdAt + FHE.decrypt(schedule.cliffDuration), "Cliff period not yet passed");
        
        // Convert external encrypted amount to internal encrypted amount
        euint32 internalReleaseAmount = FHE.fromExternal(_releaseAmount, inputProof);
        
        // Verify that the release amount doesn't exceed available amount
        euint32 availableAmount = FHE.sub(schedule.totalAmount, schedule.releasedAmount);
        require(FHE.le(internalReleaseAmount, availableAmount), "Release amount exceeds available amount");
        
        uint256 releaseId = releaseCounter++;
        
        vestingReleases[releaseId] = VestingRelease({
            releaseId: FHE.asEuint32(0), // Will be set properly later
            amount: internalReleaseAmount,
            releaseTime: FHE.asEuint32(uint32(block.timestamp)),
            isReleased: true,
            beneficiary: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vesting schedule
        schedule.releasedAmount = FHE.add(schedule.releasedAmount, internalReleaseAmount);
        
        // Check if vesting is complete
        if (FHE.eq(schedule.releasedAmount, schedule.totalAmount)) {
            schedule.isActive = false;
            emit VestingScheduleCompleted(_vestingId, msg.sender);
        }
        
        emit VestingReleaseExecuted(releaseId, _vestingId, msg.sender, 0); // Amount will be decrypted off-chain
        return releaseId;
    }
    
    function checkVestingCondition(uint256 _conditionId) public returns (bool) {
        require(vestingConditions[_conditionId].conditionCreator != address(0), "Condition does not exist");
        require(!vestingConditions[_conditionId].isConditionMet, "Condition already met");
        
        VestingCondition storage condition = vestingConditions[_conditionId];
        
        bool conditionMet = false;
        
        if (condition.isTimeBased) {
            conditionMet = block.timestamp >= FHE.decrypt(condition.milestoneTime);
        }
        
        if (condition.isMilestoneBased) {
            // This would require checking against actual vesting progress
            // For now, we'll implement a basic check
            conditionMet = true; // Simplified for demo
        }
        
        if (conditionMet) {
            condition.isConditionMet = true;
            emit VestingConditionMet(_conditionId, 0, msg.sender); // vestingId would be tracked in real implementation
        }
        
        return conditionMet;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is beneficiary or creator based on context
        if (userVestingSchedules[user].length > 0) {
            beneficiaryReputation[user] = reputation;
        } else {
            creatorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVestingScheduleInfo(uint256 _vestingId) public view returns (
        string memory beneficiaryName,
        address beneficiary,
        address creator,
        uint8 totalAmount,
        uint8 releasedAmount,
        uint8 vestingDuration,
        uint8 cliffDuration,
        bool isActive,
        bool isCliffPassed,
        uint256 createdAt
    ) {
        VestingSchedule storage schedule = vestingSchedules[_vestingId];
        return (
            schedule.beneficiaryName,
            schedule.beneficiary,
            schedule.creator,
            0, // FHE.decrypt(schedule.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(schedule.releasedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(schedule.vestingDuration) - will be decrypted off-chain
            0, // FHE.decrypt(schedule.cliffDuration) - will be decrypted off-chain
            schedule.isActive,
            schedule.isCliffPassed,
            schedule.createdAt
        );
    }
    
    function getVestingReleaseInfo(uint256 _releaseId) public view returns (
        uint8 amount,
        uint8 releaseTime,
        bool isReleased,
        address beneficiary,
        uint256 timestamp
    ) {
        VestingRelease storage release = vestingReleases[_releaseId];
        return (
            0, // FHE.decrypt(release.amount) - will be decrypted off-chain
            0, // FHE.decrypt(release.releaseTime) - will be decrypted off-chain
            release.isReleased,
            release.beneficiary,
            release.timestamp
        );
    }
    
    function getVestingConditionInfo(uint256 _conditionId) public view returns (
        uint8 milestoneAmount,
        uint8 milestoneTime,
        bool isMilestoneBased,
        bool isTimeBased,
        bool isConditionMet,
        string memory conditionDescription,
        address conditionCreator,
        uint256 createdAt
    ) {
        VestingCondition storage condition = vestingConditions[_conditionId];
        return (
            0, // FHE.decrypt(condition.milestoneAmount) - will be decrypted off-chain
            0, // FHE.decrypt(condition.milestoneTime) - will be decrypted off-chain
            condition.isMilestoneBased,
            condition.isTimeBased,
            condition.isConditionMet,
            condition.conditionDescription,
            condition.conditionCreator,
            condition.createdAt
        );
    }
    
    function getBeneficiaryReputation(address _beneficiary) public view returns (uint8) {
        return 0; // FHE.decrypt(beneficiaryReputation[_beneficiary]) - will be decrypted off-chain
    }
    
    function getCreatorReputation(address _creator) public view returns (uint8) {
        return 0; // FHE.decrypt(creatorReputation[_creator]) - will be decrypted off-chain
    }
    
    function getUserVestingSchedules(address _user) public view returns (uint256[] memory) {
        return userVestingSchedules[_user];
    }
    
    function pauseVestingSchedule(uint256 _vestingId) public {
        require(vestingSchedules[_vestingId].creator != address(0), "Vesting schedule does not exist");
        require(msg.sender == vestingSchedules[_vestingId].creator, "Only creator can pause");
        
        vestingSchedules[_vestingId].isActive = false;
    }
    
    function resumeVestingSchedule(uint256 _vestingId) public {
        require(vestingSchedules[_vestingId].creator != address(0), "Vesting schedule does not exist");
        require(msg.sender == vestingSchedules[_vestingId].creator, "Only creator can resume");
        
        vestingSchedules[_vestingId].isActive = true;
    }
}
