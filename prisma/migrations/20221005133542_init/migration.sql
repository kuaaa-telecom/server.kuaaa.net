-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('NOVICE', 'ASSOCIATE', 'REGULAR', 'HONORARY', 'EXECUTIVE', 'PRESIDENT', 'KUAAATELECOM');

-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('CONFERENCE', 'OBSERVATION', 'REGULAR', 'ETC');

-- CreateEnum
CREATE TYPE "equipment_type" AS ENUM ('TRIPOD', 'MOUNT', 'TELESCOPE', 'EYEPIECE', 'BINOCULARS', 'FILTER', 'CAMERA', 'LENS', 'BATTERY', 'ETC');

-- CreateEnum
CREATE TYPE "equipment_status" AS ENUM ('ACTIVE', 'MISSING', 'INJURED', 'RETIRED');

-- CreateEnum
CREATE TYPE "rental_status" AS ENUM ('PENDING', 'ONGOING', 'CHECKING', 'EXCEPTION', 'EXPIRED');

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "account_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "user_type" NOT NULL DEFAULT 'NOVICE',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "student_id" TEXT NOT NULL,
    "major_id" INTEGER NOT NULL,
    "registered_at" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "major" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "college" TEXT NOT NULL,

    CONSTRAINT "major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serve" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "serve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "description" TEXT,
    "type" "event_type" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "equipment_type" NOT NULL,
    "status" "equipment_status" NOT NULL,
    "casing_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casing" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "casing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "status" "rental_status" NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_account_id_key" ON "member"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serve" ADD CONSTRAINT "serve_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_casing_id_fkey" FOREIGN KEY ("casing_id") REFERENCES "casing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
