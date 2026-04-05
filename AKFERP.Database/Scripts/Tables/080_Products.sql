USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[Products]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Products] (
        [Id] UNIQUEIDENTIFIER NOT NULL,
        [Name] NVARCHAR(200) NOT NULL,
        [Description] NVARCHAR(1000) NULL,
        [Price] DECIMAL(18,2) NOT NULL,
        [Sku] NVARCHAR(64) NULL,
        [CreatedAtUtc] DATETIME2(7) NOT NULL,
        [UpdatedAtUtc] DATETIME2(7) NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
END
GO

-- Align legacy databases that used CreatedAt / UpdatedAt column names.
IF COL_LENGTH('dbo.Products', 'CreatedAtUtc') IS NULL AND COL_LENGTH('dbo.Products', 'CreatedAt') IS NOT NULL
BEGIN
    EXEC sp_rename N'dbo.Products.CreatedAt', N'CreatedAtUtc', N'COLUMN';
END
GO

IF COL_LENGTH('dbo.Products', 'UpdatedAtUtc') IS NULL AND COL_LENGTH('dbo.Products', 'UpdatedAt') IS NOT NULL
BEGIN
    EXEC sp_rename N'dbo.Products.UpdatedAt', N'UpdatedAtUtc', N'COLUMN';
END
GO

IF COL_LENGTH('dbo.Products', 'CreatedAtUtc') IS NULL
BEGIN
    ALTER TABLE [dbo].[Products] ADD [CreatedAtUtc] DATETIME2(7) NULL;
    UPDATE [dbo].[Products] SET [CreatedAtUtc] = SYSUTCDATETIME() WHERE [CreatedAtUtc] IS NULL;
    ALTER TABLE [dbo].[Products] ALTER COLUMN [CreatedAtUtc] DATETIME2(7) NOT NULL;
END
GO

IF COL_LENGTH('dbo.Products', 'UpdatedAtUtc') IS NULL
BEGIN
    ALTER TABLE [dbo].[Products] ADD [UpdatedAtUtc] DATETIME2(7) NULL;
END
GO

-- Legacy column not mapped by the application: allow NULL so inserts without Stock succeed.
IF COL_LENGTH('dbo.Products', 'Stock') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[Products] ALTER COLUMN [Stock] INT NULL;
END
GO
