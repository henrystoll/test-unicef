BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Org] (
    [id] INT NOT NULL IDENTITY(1,1),
    [url] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Org_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Org_url_key] UNIQUE ([url])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [orgId] INT NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[Org]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
