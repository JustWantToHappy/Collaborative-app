/*
  Warnings:

  - You are about to drop the column `type` on the `chatroom` table. All the data in the column will be lost.
  - Made the column `groupId` on table `chatroom` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_groupId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `type`,
    MODIFY `groupId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
