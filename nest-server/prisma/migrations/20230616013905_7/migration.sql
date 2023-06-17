/*
  Warnings:

  - You are about to drop the column `userId` on the `chatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userFriendId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userId_fkey`;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `userId`,
    ADD COLUMN `userFriendId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ChatRoom_userFriendId_key` ON `ChatRoom`(`userFriendId`);

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userFriendId_fkey` FOREIGN KEY (`userFriendId`) REFERENCES `UserFriend`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
