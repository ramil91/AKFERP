USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[Employees]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Employees] (
        [EmployeeId] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [DF_Employees_EmployeeId] DEFAULT NEWID(),
        [ProjectId] INT NULL,
        [UserId] INT NULL,
        [EmployeeCode] NVARCHAR(50) NOT NULL,
        [FirstName] NVARCHAR(100) NULL,
        [LastName] NVARCHAR(100) NULL,
        [CNIC] NVARCHAR(20) NULL,
        [DateOfBirth] DATE NULL,
        [Gender] NVARCHAR(10) NULL,
        [MaritalStatus] NVARCHAR(20) NULL,
        [BloodGroup] NVARCHAR(5) NULL,
        [PersonalEmail] NVARCHAR(255) NULL,
        [Phone] NVARCHAR(50) NULL,
        [Address] NVARCHAR(MAX) NULL,
        [Department] NVARCHAR(100) NULL,
        [Designation] NVARCHAR(100) NULL,
        [EmploymentType] NVARCHAR(50) NULL,
        [HireDate] DATE NULL,
        [ConfirmationDate] DATE NULL,
        [ReportingManagerId] UNIQUEIDENTIFIER NULL,
        [Status] NVARCHAR(50) NULL,
        [BasicSalary] DECIMAL(18, 2) NULL,
        [Allowances] DECIMAL(18, 2) NULL,
        [Deductions] DECIMAL(18, 2) NULL,
        [BankName] NVARCHAR(100) NULL,
        [BankAccountNo] NVARCHAR(50) NULL,
        [SalaryPaymentMethod] NVARCHAR(50) NULL,
        [CreatedBy] UNIQUEIDENTIFIER NULL,
        [CreatedDate] DATETIME2(7) NOT NULL
            CONSTRAINT [DF_Employees_CreatedDate] DEFAULT SYSUTCDATETIME(),
        [UpdatedBy] UNIQUEIDENTIFIER NULL,
        [UpdatedDate] DATETIME2(7) NULL,
        [IPAddress] NVARCHAR(45) NULL,
        CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED ([EmployeeId] ASC),
        CONSTRAINT [UQ_Employees_EmployeeCode] UNIQUE ([EmployeeCode] ASC)
    );

    ALTER TABLE [dbo].[Employees] WITH NOCHECK
        ADD CONSTRAINT [FK_Employees_ReportingManager] FOREIGN KEY ([ReportingManagerId])
        REFERENCES [dbo].[Employees] ([EmployeeId]);
END
GO
