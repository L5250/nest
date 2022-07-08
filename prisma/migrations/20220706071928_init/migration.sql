/*
  Warnings:

  - You are about to drop the column `blogUsersId` on the `posts` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT DEFAULT '',
    "imageUrlBase64" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "create_user_id" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "posts_create_user_id_fkey" FOREIGN KEY ("create_user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("content", "id", "imageUrl", "imageUrlBase64", "remark", "title") SELECT "content", "id", "imageUrl", "imageUrlBase64", "remark", "title" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "email" TEXT DEFAULT '',
    "passwordHash" TEXT NOT NULL DEFAULT '',
    "avatar_url" TEXT DEFAULT '',
    "avatar_url_base64" TEXT DEFAULT '',
    "telephone" TEXT DEFAULT '',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("avatar_url", "avatar_url_base64", "created_at", "email", "id", "isAdmin", "password", "passwordHash", "telephone", "updated_at", "user_name") SELECT "avatar_url", "avatar_url_base64", "created_at", "email", "id", "isAdmin", "password", "passwordHash", "telephone", "updated_at", "user_name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
