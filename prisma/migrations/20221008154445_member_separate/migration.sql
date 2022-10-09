/*
  Warnings:

  - You are about to drop the column `account_id` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `member` table. All the data in the column will be lost.
  - The `type` column on the `member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[student_id]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "member_type" AS ENUM ('NOVICE', 'ASSOCIATE', 'REGULAR', 'HONORARY', 'EXECUTIVE', 'PRESIDENT', 'KUAAATELECOM');

-- DropIndex
DROP INDEX "member_account_id_key";

-- DropIndex
DROP INDEX "member_email_key";

-- AlterTable
ALTER TABLE "member" DROP COLUMN "account_id",
DROP COLUMN "password",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "member_type" NOT NULL DEFAULT 'NOVICE',
ALTER COLUMN "email" DROP NOT NULL;

-- DropEnum
DROP TYPE "user_type";

-- CreateTable
CREATE TABLE "member_account" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "member_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_account_member_id_key" ON "member_account"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "member_student_id_key" ON "member"("student_id");

-- AddForeignKey
ALTER TABLE "member_account" ADD CONSTRAINT "member_account_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
