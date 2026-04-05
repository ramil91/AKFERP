USE [AKFERP];
GO

IF OBJECT_ID(N'[dbo].[fn_ProductCount]', N'FN') IS NOT NULL
    DROP FUNCTION [dbo].[fn_ProductCount];
GO

CREATE FUNCTION [dbo].[fn_ProductCount]()
RETURNS INT
AS
BEGIN
    DECLARE @count INT;
    SELECT @count = COUNT(*) FROM [dbo].[Products];
    RETURN @count;
END
GO
