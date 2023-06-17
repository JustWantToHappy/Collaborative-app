-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userId_fkey`;

-- AlterTable
ALTER TABLE `usergroup` ADD COLUMN `chatRoomId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserFriend`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
