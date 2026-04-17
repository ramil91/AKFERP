USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[Parties]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Parties] (
        [Id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [DF_Parties_Id] DEFAULT NEWID(),
        [PartyNumber] INT IDENTITY(1000, 1) NOT NULL,
        [PartyTypeId] INT NOT NULL,
        [DisplayName] NVARCHAR(255) NOT NULL,
        [Phone] NVARCHAR(50) NULL,
        [Email] NVARCHAR(255) NULL,
        [Country] NVARCHAR(100) NULL,
        [City] NVARCHAR(100) NULL,
        [IsActive] BIT NOT NULL
            CONSTRAINT [DF_Parties_IsActive] DEFAULT 1,
        [CreatedBy] UNIQUEIDENTIFIER NULL,
        [CreatedDate] DATETIME2(7) NOT NULL
            CONSTRAINT [DF_Parties_CreatedDate] DEFAULT SYSUTCDATETIME(),
        [UpdatedBy] UNIQUEIDENTIFIER NULL,
        [UpdatedDate] DATETIME2(7) NULL,
        [IPAddress] NVARCHAR(45) NULL,
        CONSTRAINT [PK_Parties] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [UQ_Parties_PartyNumber] UNIQUE ([PartyNumber] ASC),
        CONSTRAINT [FK_Parties_PartyType] FOREIGN KEY ([PartyTypeId])
            REFERENCES [dbo].[LookupValues] ([Id])
    );
END
GO
