-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "familyName" TEXT NOT NULL DEFAULT E'',
    "givenName" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "account" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL DEFAULT E'',
    "expansion" TEXT NOT NULL DEFAULT E'',
    "time" INTEGER,
    "article_number" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "operator" TEXT,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medium" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "url" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Medium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "game" TEXT,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expansion" (
    "id" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "icon" TEXT,
    "game" TEXT,
    "locals" TEXT,

    CONSTRAINT "Expansion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL DEFAULT E'',
    "status" TEXT NOT NULL DEFAULT E'',
    "numberText" TEXT NOT NULL DEFAULT E'',
    "website" TEXT NOT NULL DEFAULT E'',
    "number" INTEGER,
    "countSells" INTEGER,
    "priceStrategy" INTEGER,
    "image" TEXT,
    "expansion" TEXT,
    "productModel" TEXT,
    "category" TEXT,
    "rarity" TEXT,
    "locals" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "code" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "identifier" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchProd" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "BatchProd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL DEFAULT E'',
    "comment" TEXT NOT NULL DEFAULT E'',
    "status" TEXT NOT NULL DEFAULT E'',
    "from" TEXT NOT NULL DEFAULT E'',
    "priceSuggested" INTEGER,
    "lastEdited" TIMESTAMP(3),
    "isSigned" BOOLEAN NOT NULL DEFAULT false,
    "isFirstEd" BOOLEAN NOT NULL DEFAULT false,
    "isAltered" BOOLEAN NOT NULL DEFAULT false,
    "isFoil" BOOLEAN NOT NULL DEFAULT false,
    "isReverseHolo" BOOLEAN NOT NULL DEFAULT false,
    "isPlayset" BOOLEAN NOT NULL DEFAULT false,
    "product" TEXT,
    "priceCurrency" TEXT,
    "condition" TEXT,
    "batchProd" TEXT,
    "language" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "price" INTEGER,
    "article" TEXT,
    "operator" TEXT,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleItem" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL DEFAULT E'',
    "quantity" INTEGER,
    "article" TEXT,
    "storage" TEXT,

    CONSTRAINT "ArticleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plateform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Plateform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL DEFAULT E'',
    "status" TEXT NOT NULL DEFAULT E'',
    "price" INTEGER,
    "eligibleQuantity" INTEGER,
    "articleItem" TEXT,
    "operator" TEXT,
    "priceCurrency" TEXT,
    "plateform" TEXT,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" TEXT NOT NULL,
    "typeOf" TEXT NOT NULL DEFAULT E'',
    "value" TEXT NOT NULL DEFAULT E'',
    "language" TEXT,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "ratingValue" TEXT NOT NULL DEFAULT E'',
    "author" TEXT,
    "action" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "action_status" TEXT NOT NULL DEFAULT E'',
    "result" TEXT NOT NULL DEFAULT E'',
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "expected_start_time" TIMESTAMP(3),
    "expected_end_time" TIMESTAMP(3),
    "agent" TEXT,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControlAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "action_status" TEXT NOT NULL DEFAULT E'',
    "result" TEXT NOT NULL DEFAULT E'',
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "expected_start_time" TIMESTAMP(3),
    "expected_end_time" TIMESTAMP(3),
    "agent" TEXT,
    "targetStorage" TEXT,
    "targetArticleItem" TEXT,

    CONSTRAINT "ControlAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT E'',
    "action" TEXT,
    "controlAction" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Expansion_storages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Action_targetStorage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Action_targetArticleItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_account_key" ON "Person"("account");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Batch_operator_idx" ON "Batch"("operator");

-- CreateIndex
CREATE INDEX "ProductModel_game_idx" ON "ProductModel"("game");

-- CreateIndex
CREATE INDEX "Expansion_icon_idx" ON "Expansion"("icon");

-- CreateIndex
CREATE INDEX "Expansion_game_idx" ON "Expansion"("game");

-- CreateIndex
CREATE INDEX "Expansion_locals_idx" ON "Expansion"("locals");

-- CreateIndex
CREATE INDEX "Product_image_idx" ON "Product"("image");

-- CreateIndex
CREATE INDEX "Product_expansion_idx" ON "Product"("expansion");

-- CreateIndex
CREATE INDEX "Product_productModel_idx" ON "Product"("productModel");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_rarity_idx" ON "Product"("rarity");

-- CreateIndex
CREATE INDEX "Product_locals_idx" ON "Product"("locals");

-- CreateIndex
CREATE INDEX "Article_product_idx" ON "Article"("product");

-- CreateIndex
CREATE INDEX "Article_priceCurrency_idx" ON "Article"("priceCurrency");

-- CreateIndex
CREATE INDEX "Article_condition_idx" ON "Article"("condition");

-- CreateIndex
CREATE INDEX "Article_batchProd_idx" ON "Article"("batchProd");

-- CreateIndex
CREATE INDEX "Article_language_idx" ON "Article"("language");

-- CreateIndex
CREATE INDEX "Pricing_article_idx" ON "Pricing"("article");

-- CreateIndex
CREATE INDEX "Pricing_operator_idx" ON "Pricing"("operator");

-- CreateIndex
CREATE INDEX "ArticleItem_article_idx" ON "ArticleItem"("article");

-- CreateIndex
CREATE INDEX "ArticleItem_storage_idx" ON "ArticleItem"("storage");

-- CreateIndex
CREATE INDEX "Offer_articleItem_idx" ON "Offer"("articleItem");

-- CreateIndex
CREATE INDEX "Offer_operator_idx" ON "Offer"("operator");

-- CreateIndex
CREATE INDEX "Offer_priceCurrency_idx" ON "Offer"("priceCurrency");

-- CreateIndex
CREATE INDEX "Offer_plateform_idx" ON "Offer"("plateform");

-- CreateIndex
CREATE INDEX "Local_language_idx" ON "Local"("language");

-- CreateIndex
CREATE INDEX "Rating_author_idx" ON "Rating"("author");

-- CreateIndex
CREATE INDEX "Rating_action_idx" ON "Rating"("action");

-- CreateIndex
CREATE INDEX "Action_agent_idx" ON "Action"("agent");

-- CreateIndex
CREATE INDEX "ControlAction_agent_idx" ON "ControlAction"("agent");

-- CreateIndex
CREATE INDEX "ControlAction_targetStorage_idx" ON "ControlAction"("targetStorage");

-- CreateIndex
CREATE INDEX "ControlAction_targetArticleItem_idx" ON "ControlAction"("targetArticleItem");

-- CreateIndex
CREATE INDEX "Comment_action_idx" ON "Comment"("action");

-- CreateIndex
CREATE INDEX "Comment_controlAction_idx" ON "Comment"("controlAction");

-- CreateIndex
CREATE UNIQUE INDEX "_Expansion_storages_AB_unique" ON "_Expansion_storages"("A", "B");

-- CreateIndex
CREATE INDEX "_Expansion_storages_B_index" ON "_Expansion_storages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Action_targetStorage_AB_unique" ON "_Action_targetStorage"("A", "B");

-- CreateIndex
CREATE INDEX "_Action_targetStorage_B_index" ON "_Action_targetStorage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Action_targetArticleItem_AB_unique" ON "_Action_targetArticleItem"("A", "B");

-- CreateIndex
CREATE INDEX "_Action_targetArticleItem_B_index" ON "_Action_targetArticleItem"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_account_fkey" FOREIGN KEY ("account") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_operator_fkey" FOREIGN KEY ("operator") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_game_fkey" FOREIGN KEY ("game") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expansion" ADD CONSTRAINT "Expansion_icon_fkey" FOREIGN KEY ("icon") REFERENCES "Medium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expansion" ADD CONSTRAINT "Expansion_game_fkey" FOREIGN KEY ("game") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expansion" ADD CONSTRAINT "Expansion_locals_fkey" FOREIGN KEY ("locals") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_image_fkey" FOREIGN KEY ("image") REFERENCES "Medium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_expansion_fkey" FOREIGN KEY ("expansion") REFERENCES "Expansion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productModel_fkey" FOREIGN KEY ("productModel") REFERENCES "ProductModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_rarity_fkey" FOREIGN KEY ("rarity") REFERENCES "Rarity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_locals_fkey" FOREIGN KEY ("locals") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_priceCurrency_fkey" FOREIGN KEY ("priceCurrency") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_condition_fkey" FOREIGN KEY ("condition") REFERENCES "Condition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_batchProd_fkey" FOREIGN KEY ("batchProd") REFERENCES "BatchProd"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_article_fkey" FOREIGN KEY ("article") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_operator_fkey" FOREIGN KEY ("operator") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItem" ADD CONSTRAINT "ArticleItem_article_fkey" FOREIGN KEY ("article") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItem" ADD CONSTRAINT "ArticleItem_storage_fkey" FOREIGN KEY ("storage") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_articleItem_fkey" FOREIGN KEY ("articleItem") REFERENCES "ArticleItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_operator_fkey" FOREIGN KEY ("operator") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_priceCurrency_fkey" FOREIGN KEY ("priceCurrency") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_plateform_fkey" FOREIGN KEY ("plateform") REFERENCES "Plateform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_author_fkey" FOREIGN KEY ("author") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_action_fkey" FOREIGN KEY ("action") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_agent_fkey" FOREIGN KEY ("agent") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlAction" ADD CONSTRAINT "ControlAction_agent_fkey" FOREIGN KEY ("agent") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlAction" ADD CONSTRAINT "ControlAction_targetStorage_fkey" FOREIGN KEY ("targetStorage") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlAction" ADD CONSTRAINT "ControlAction_targetArticleItem_fkey" FOREIGN KEY ("targetArticleItem") REFERENCES "ArticleItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_action_fkey" FOREIGN KEY ("action") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_controlAction_fkey" FOREIGN KEY ("controlAction") REFERENCES "ControlAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Expansion_storages" ADD FOREIGN KEY ("A") REFERENCES "Expansion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Expansion_storages" ADD FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_targetStorage" ADD FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_targetStorage" ADD FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_targetArticleItem" ADD FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_targetArticleItem" ADD FOREIGN KEY ("B") REFERENCES "ArticleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
