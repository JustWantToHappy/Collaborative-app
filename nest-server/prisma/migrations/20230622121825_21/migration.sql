/*
  Warnings:

  - You are about to drop the column `chatRecordId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `chatrecord` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `chatrecord` DROP FOREIGN KEY `ChatRecord_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `chatrecord` DROP FOREIGN KEY `ChatRecord_userId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_chatRecordId_fkey`;

-- AlterTable
ALTER TABLE `chatroom` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'private',
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `groupId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `chatRecordId`,
    ADD COLUMN `chatRoomId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `chatrecord`;

-- CreateIndex
CREATE UNIQUE INDEX `ChatRoom_userId_key` ON `ChatRoom`(`userId`);

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
