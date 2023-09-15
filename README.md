# ostello_user_management-apis
# User Creation API Documentation

## API Endpoint

`POST /api/users/create`

## Description

This API endpoint allows you to create a new user in the system.

## Request

- **Method**: POST
- **Content Type**: JSON

### Request Body

The request body should contain the following parameters:

- `name` (string, required): The name of the user.
- `userName` (string, required): The username chosen by the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The user's password.

Example Request Body:

```json

{
  "name": "John Doe",
  "userName": "johndoe123",
  "email": "john@example.com",
  "password": "securePassword"
}