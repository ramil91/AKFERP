USE [AKFERP];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[AspNetRoles] WHERE [NormalizedName] = N'ADMIN')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (N'11111111-1111-1111-1111-111111111111', N'Admin', N'ADMIN', N'role-admin-stamp');
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[AspNetRoles] WHERE [NormalizedName] = N'USER')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp])
    VALUES (N'22222222-2222-2222-2222-222222222222', N'User', N'USER', N'role-user-stamp');
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[AspNetUsers] WHERE [NormalizedEmail] = N'ADMIN@AKFERP.LOCAL')
BEGIN
    DECLARE @AdminRoleId NVARCHAR(450) = (SELECT TOP (1) [Id] FROM [dbo].[AspNetRoles] WHERE [NormalizedName] = N'ADMIN');

    INSERT INTO [dbo].[AspNetUsers] (
        [Id],
        [UserName],
        [NormalizedUserName],
        [Email],
        [NormalizedEmail],
        [EmailConfirmed],
        [PasswordHash],
        [SecurityStamp],
        [ConcurrencyStamp],
        [PhoneNumber],
        [PhoneNumberConfirmed],
        [TwoFactorEnabled],
        [LockoutEnd],
        [LockoutEnabled],
        [AccessFailedCount],
        [FirstName],
        [LastName]
    )
    VALUES (
        N'00000000-0000-0000-0000-000000000001',
        N'admin@akferp.local',
        N'ADMIN@AKFERP.LOCAL',
        N'admin@akferp.local',
        N'ADMIN@AKFERP.LOCAL',
        1,
        N'AQAAAAIAAYagAAAAEHDELbRXVxXX+26W+pD/njzdeyQGSi2gnZw8uWdoFXrmgv/gZT36IMvEEod6rARvjw==',
        N'7b8f6c2a9e4d4a1f9c3e5d6a7b8c9d0e',
        N'8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
        NULL,
        0,
        0,
        NULL,
        1,
        0,
        N'System',
        N'Administrator'
    );

    IF @AdminRoleId IS NOT NULL
    BEGIN
        INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId])
        VALUES (N'00000000-0000-0000-0000-000000000001', @AdminRoleId);
    END
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Products] WHERE [Id] = N'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
BEGIN
    INSERT INTO [dbo].[Products] ([Id], [Name], [Description], [Price], [Sku], [CreatedAtUtc], [UpdatedAtUtc])
    VALUES (
        N'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        N'Sample Widget',
        N'Seeded product for API smoke tests.',
        19.99,
        N'DEMO-001',
        SYSUTCDATETIME(),
        NULL
    );
END
GO
