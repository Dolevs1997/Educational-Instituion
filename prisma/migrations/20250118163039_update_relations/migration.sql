/*
  Warnings:

  - Added the required column `department` to the `Coordinator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinator" ADD COLUMN     "department" TEXT NOT NULL;
