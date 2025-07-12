-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "lastEdited" TIMESTAMP(3) NOT NULL,
    "isArchived" BOOLEAN NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
