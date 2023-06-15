/*
  Warnings:

  - You are about to drop the column `userId` on the `chatrecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `chatrecord` DROP FOREIGN KEY `ChatRecord_userId_fkey`;

-- AlterTable
ALTER TABLE `chatrecord` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `chatroom` ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ChatRoom_userId_key` ON `ChatRoom`(`userId`);

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
