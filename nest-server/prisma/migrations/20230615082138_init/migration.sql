/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userFriendId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `chatroom` ADD COLUMN `groupId` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `type` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `userFriendId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `message` ADD COLUMN `isread` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `ChatRoom_groupId_key` ON `ChatRoom`(`groupId`);

-- CreateIndex
CREATE UNIQUE INDEX `ChatRoom_userFriendId_key` ON `ChatRoom`(`userFriendId`);

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userFriendId_fkey` FOREIGN KEY (`userFriendId`) REFERENCES `UserFriend`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
