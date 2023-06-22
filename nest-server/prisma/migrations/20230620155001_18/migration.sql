-- AlterTable
ALTER TABLE `message` ADD COLUMN `groupAvatar` VARCHAR(191) NULL,
    ADD COLUMN `groupName` VARCHAR(191) NULL,
    MODIFY `thirdPartyId` VARCHAR(191) NULL;
