CREATE OR ALTER PROCEDURE getById(@id VARCHAR(100))
AS
BEGIN
    SELECT * FROM Notes WHERE id = @id
END