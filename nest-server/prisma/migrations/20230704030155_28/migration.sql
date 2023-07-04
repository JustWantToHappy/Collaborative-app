/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `CloudFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `calendar` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `cloudfile` MODIFY `collaborators` TEXT NULL,
    MODIFY `text` LONGTEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CloudFile_ownerId_key` ON `CloudFile`(`ownerId`);
