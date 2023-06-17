/*
  Warnings:

  - You are about to drop the column `ChatRoomId` on the `chatrecord` table. All the data in the column will be lost.
  - You are about to drop the column `CloudFileId` on the `clouddocument` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatrecord` DROP FOREIGN KEY `ChatRecord_ChatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `clouddocument` DROP FOREIGN KEY `CloudDocument_CloudFileId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` DROP COLUMN `ChatRoomId`,
    ADD COLUMN `chatRoomId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `clouddocument` DROP COLUMN `CloudFileId`,
    ADD COLUMN `cloudFileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ChatRecord` ADD CONSTRAINT `ChatRecord_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CloudDocument` ADD CONSTRAINT `CloudDocument_cloudFileId_fkey` FOREIGN KEY (`cloudFileId`) REFERENCES `CloudFile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
