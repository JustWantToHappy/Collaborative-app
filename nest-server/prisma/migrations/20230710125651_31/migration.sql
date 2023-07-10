/*
  Warnings:

  - You are about to drop the column `collaborators` on the `cloudfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cloudfile` DROP COLUMN `collaborators`;

-- AlterTable
ALTER TABLE `sharedcloudfile` ADD COLUMN `version` INTEGER NOT NULL DEFAULT 1;
