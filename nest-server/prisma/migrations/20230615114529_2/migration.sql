/*
  Warnings:

  - You are about to drop the column `userFriendId` on the `chatroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userFriendId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `userFriendId`;

-- AddForeignKey
ALTER TABLE `ChatRecord` ADD CONSTRAINT `ChatRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
