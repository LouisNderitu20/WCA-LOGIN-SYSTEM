-- AlterTable
ALTER TABLE `user` ADD COLUMN `authProvider` VARCHAR(191) NOT NULL DEFAULT 'credentials';
