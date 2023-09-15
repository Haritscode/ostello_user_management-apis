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

json

{
  "name": "John Doe",
  "userName": "johndoe123",
  "email": "john@example.com",
  "password": "securePassword"
}

# Delete User API

This API is used to delete a user account. Authentication is required to access this endpoint.

## Endpoint

`DELETE /api/users/:id`

- `:id` (required): The unique identifier of the user to be deleted.

## Authentication

To use this API, you must include authentication credentials in the request headers.

Example Headers:
```http
Authorization: Bearer <your-access-token>