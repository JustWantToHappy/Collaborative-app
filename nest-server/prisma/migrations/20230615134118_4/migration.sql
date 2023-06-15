-- AlterTable
ALTER TABLE `chatroom` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE `message` MODIFY `fileType` VARCHAR(191) NOT NULL DEFAULT 'text';
