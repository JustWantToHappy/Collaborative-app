/*
  Warnings:

  - You are about to drop the column `desc` on the `calendar` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `cloudfile` table. All the data in the column will be lost.
  - Added the required column `description` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Made the column `cloudFileId` on table `clouddocument` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `CloudFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clouddocument` DROP FOREIGN KEY `CloudDocument_cloudFileId_fkey`;

-- AlterTable
ALTER TABLE `calendar` DROP COLUMN `desc`,
    ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `clouddocument` ADD COLUMN `isshared` INTEGER NOT NULL DEFAULT 0,
    MODIFY `text` LONGTEXT NOT NULL,
    MODIFY `collaborators` TEXT NOT NULL,
    MODIFY `cloudFileId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `cloudfile` DROP COLUMN `type`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `isshared` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `group` MODIFY `description` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `isshared` INTEGER NOT NULL DEFAULT 0,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NOT NULL,
    `userId` VARCHAR(191) NULL,
    `cloudFileId` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CloudDocument` ADD CONSTRAINT `CloudDocument_cloudFileId_fkey` FOREIGN KEY (`cloudFileId`) REFERENCES `CloudFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_cloudFileId_fkey` FOREIGN KEY (`cloudFileId`) REFERENCES `CloudFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
