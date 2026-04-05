USE [AKFERP];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

IF OBJECT_ID(N'[dbo].[AspNetRoleClaims]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[AspNetRoleClaims] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [RoleId] NVARCHAR(450) NOT NULL,
        [ClaimType] NVARCHAR(MAX) NULL,
        [ClaimValue] NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_AspNetRoleClaims_RoleId' AND object_id = OBJECT_ID(N'[dbo].[AspNetRoleClaims]'))
    CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims] ([RoleId] ASC);
GO
