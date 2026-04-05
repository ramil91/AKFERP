USE [AKFERP];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

IF OBJECT_ID(N'[dbo].[AspNetUsers]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[AspNetUsers] (
        [Id] NVARCHAR(450) NOT NULL,
        [UserName] NVARCHAR(256) NULL,
        [NormalizedUserName] NVARCHAR(256) NULL,
        [Email] NVARCHAR(256) NULL,
        [NormalizedEmail] NVARCHAR(256) NULL,
        [EmailConfirmed] BIT NOT NULL CONSTRAINT [DF_AspNetUsers_EmailConfirmed] DEFAULT (0),
        [PasswordHash] NVARCHAR(MAX) NULL,
        [SecurityStamp] NVARCHAR(MAX) NULL,
        [ConcurrencyStamp] NVARCHAR(MAX) NULL,
        [PhoneNumber] NVARCHAR(MAX) NULL,
        [PhoneNumberConfirmed] BIT NOT NULL CONSTRAINT [DF_AspNetUsers_PhoneNumberConfirmed] DEFAULT (0),
        [TwoFactorEnabled] BIT NOT NULL CONSTRAINT [DF_AspNetUsers_TwoFactorEnabled] DEFAULT (0),
        [LockoutEnd] DATETIMEOFFSET(7) NULL,
        [LockoutEnabled] BIT NOT NULL CONSTRAINT [DF_AspNetUsers_LockoutEnabled] DEFAULT (0),
        [AccessFailedCount] INT NOT NULL CONSTRAINT [DF_AspNetUsers_AccessFailedCount] DEFAULT (0),
        [FirstName] NVARCHAR(100) NULL,
        [LastName] NVARCHAR(100) NULL,
        CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'EmailIndex' AND object_id = OBJECT_ID(N'[dbo].[AspNetUsers]'))
    CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers] ([NormalizedEmail] ASC);
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UserNameIndex' AND object_id = OBJECT_ID(N'[dbo].[AspNetUsers]'))
    CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers] ([NormalizedUserName] ASC) WHERE ([NormalizedUserName] IS NOT NULL);
GO
