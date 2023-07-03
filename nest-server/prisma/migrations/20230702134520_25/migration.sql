-- AlterTable
ALTER TABLE `clouddocument` MODIFY `cloudFileId` VARCHAR(191) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `image` MODIFY `cloudFileId` VARCHAR(191) NOT NULL DEFAULT '0';
