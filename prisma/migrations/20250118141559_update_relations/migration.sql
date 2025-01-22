/*
  Warnings:

  - You are about to drop the `_CoordinatorToInstructor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coordinatorId` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principalId` to the `Instructor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CoordinatorToInstructor" DROP CONSTRAINT "_CoordinatorToInstructor_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoordinatorToInstructor" DROP CONSTRAINT "_CoordinatorToInstructor_B_fkey";

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "coordinatorId" INTEGER NOT NULL,
ADD COLUMN     "principalId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CoordinatorToInstructor";

-- CreateIndex
CREATE UNIQUE INDEX "Coordinator_email_key" ON "Coordinator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_principalId_fkey" FOREIGN KEY ("principalId") REFERENCES "Principal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
