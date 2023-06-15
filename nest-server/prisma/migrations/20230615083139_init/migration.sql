-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userFriendId_fkey`;

-- AlterTable
ALTER TABLE `chatroom` MODIFY `groupId` VARCHAR(191) NULL,
    MODIFY `userFriendId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userFriendId_fkey` FOREIGN KEY (`userFriendId`) REFERENCES `UserFriend`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
