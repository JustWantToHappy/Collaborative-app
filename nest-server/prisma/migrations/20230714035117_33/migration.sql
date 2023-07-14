/*
  Warnings:

  - Added the required column `description` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `approval` ADD COLUMN `description` TEXT NOT NULL;
