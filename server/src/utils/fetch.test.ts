import Fetch from './fetch.js';

describe('Fetch', () => {
  it('should make a GET request', async () => {
    // Arrange
    const url = 'http://echo.jsontest.com/title/ipsum/content/blah';
    const expectedResponse = {
      title: 'ipsum',
      content: 'blah',
    };

    // Act
    const response = await Fetch.get(url);

    // Assert
    expect(response).toEqual(expectedResponse);
  });
});
