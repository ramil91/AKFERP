USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[LookupValues]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[LookupValues] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Category] NVARCHAR(100) NOT NULL,
        [Value] NVARCHAR(255) NOT NULL,
        [DisplayOrder] INT NOT NULL CONSTRAINT [DF_LookupValues_DisplayOrder] DEFAULT 0,
        [IsActive] BIT NOT NULL CONSTRAINT [DF_LookupValues_IsActive] DEFAULT 1,
        CONSTRAINT [PK_LookupValues] PRIMARY KEY CLUSTERED ([Id] ASC)
    );

    -- Seed Party Types
    INSERT INTO [dbo].[LookupValues] ([Category], [Value], [DisplayOrder])
    VALUES
        (N'PartyType', N'Person', 1),
        (N'PartyType', N'Organization', 2);
END
GO
