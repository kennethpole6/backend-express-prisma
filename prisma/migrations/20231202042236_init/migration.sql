/*
  Warnings:

  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `notesId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `Notes_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `Notes_notesId_fkey`;

-- AlterTable
ALTER TABLE `notes` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    DROP COLUMN `notesId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `category`;
