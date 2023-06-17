/*
  Warnings:

  - You are about to drop the column `userFriendId` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the `userfriend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userFriendId_fkey`;

-- DropForeignKey
ALTER TABLE `userfriend` DROP FOREIGN KEY `UserFriend_friendId_fkey`;

-- DropForeignKey
ALTER TABLE `userfriend` DROP FOREIGN KEY `UserFriend_userId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `userFriendId`,
    MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE `message` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'chat';

-- DropTable
DROP TABLE `userfriend`;

-- CreateTable
CREATE TABLE `Friend` (
    `userId` VARCHAR(191) NOT NULL,
    `friendList` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRecord` ADD CONSTRAINT `ChatRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
