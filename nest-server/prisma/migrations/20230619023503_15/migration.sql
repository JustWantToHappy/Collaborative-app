/*
  Warnings:

  - You are about to drop the column `receiverId` on the `chatrecord` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `chatrecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `chatrecord` table. All the data in the column will be lost.
  - You are about to drop the `usergroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usergroup` DROP FOREIGN KEY `UserGroup_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `usergroup` DROP FOREIGN KEY `UserGroup_userId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `message` ADD COLUMN `receiverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `senderId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usergroup`;
