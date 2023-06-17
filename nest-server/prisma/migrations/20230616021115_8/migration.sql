/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `usergroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usergroup` DROP FOREIGN KEY `UserGroup_chatRoomId_fkey`;

-- AlterTable
ALTER TABLE `usergroup` DROP COLUMN `chatRoomId`;
