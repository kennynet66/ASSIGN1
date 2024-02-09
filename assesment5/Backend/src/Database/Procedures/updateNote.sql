CREATE OR ALTER PROCEDURE updateNote(
    @id VARCHAR(100),
    @title VARCHAR(200),
    @content VARCHAR(1500),
    @createdAt VARCHAR(100)
    )
AS
BEGIN
    UPDATE Notes
    SET title = @title, content = @content, createdAt = @createdAt
    WHERE id = @id
END