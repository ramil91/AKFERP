USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[Projects]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Projects] (
        [ProjectId] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [DF_Projects_ProjectId] DEFAULT NEWID(),
        [ProjectName] NVARCHAR(255) NOT NULL,
        [ProjectCode] NVARCHAR(50) NOT NULL,
        [ProjectType] NVARCHAR(50) NULL,
        [StartDate] DATE NULL,
        [EndDate] DATE NULL,
        [Status] NVARCHAR(50) NULL,
        [LocationAddress] NVARCHAR(MAX) NULL,
        [City] NVARCHAR(100) NULL,
        [Province] NVARCHAR(100) NULL,
        [Country] NVARCHAR(100) NULL,
        [BudgetAllocated] DECIMAL(18, 2) NULL,
        [DonorName] NVARCHAR(255) NULL,
        [ProjectManagerId] UNIQUEIDENTIFIER NULL,
        [ParentProjectId] UNIQUEIDENTIFIER NULL,
        [Description] NVARCHAR(MAX) NULL,
        [CreatedBy] UNIQUEIDENTIFIER NULL,
        [CreatedDate] DATETIME2(7) NOT NULL
            CONSTRAINT [DF_Projects_CreatedDate] DEFAULT SYSUTCDATETIME(),
        [UpdatedBy] UNIQUEIDENTIFIER NULL,
        [UpdatedDate] DATETIME2(7) NULL,
        [IPAddress] NVARCHAR(45) NULL,
        CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED ([ProjectId] ASC),
        CONSTRAINT [UQ_Projects_ProjectCode] UNIQUE ([ProjectCode] ASC)
    );

    ALTER TABLE [dbo].[Projects] WITH NOCHECK
        ADD CONSTRAINT [FK_Projects_ProjectManager] FOREIGN KEY ([ProjectManagerId])
        REFERENCES [dbo].[Employees] ([EmployeeId]);

    ALTER TABLE [dbo].[Projects] WITH NOCHECK
        ADD CONSTRAINT [FK_Projects_ParentProject] FOREIGN KEY ([ParentProjectId])
        REFERENCES [dbo].[Projects] ([ProjectId]);
END
GO
