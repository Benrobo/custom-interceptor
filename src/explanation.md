Below are the steps to do revoke your JWT access token:

- When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
  
- The access token will have less expiry time and Refresh will have long expiry time.
  
- The client (Front end) will store refresh token in his local storage and access token in cookies.
  
- The client will use an access token for calling APIs. But when it expires, you call auth server API to get the new token (refresh token is automatically added to http request since it's stored in cookies).
  
- Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
  
- Once the refresh token is expired, the User will be logged out.