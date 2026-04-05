USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[sp_GetProductById]', N'P') IS NOT NULL
    DROP PROCEDURE [dbo].[sp_GetProductById];
GO

CREATE PROCEDURE [dbo].[sp_GetProductById]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id],
        [Name],
        [Description],
        [Price],
        [Sku],
        [CreatedAtUtc],
        [UpdatedAtUtc]
    FROM [dbo].[Products]
    WHERE [Id] = @Id;
END
GO
