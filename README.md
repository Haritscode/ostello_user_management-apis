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

```

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
```

# Get User Information API

This API is used to retrieve information about a user by their unique identifier.

## Endpoint

`GET /api/users/:id`

- `:id` (required): The unique identifier of the user whose information you want to retrieve.

## Request

- Method: `GET`

## Response

- `200 OK`: If the user information is found, the server will respond with a JSON object containing the user's details, including `id`, `name`, `userName`, `email`, and `version`.

    Example Response:
    ```json
    {
        "id": 1,
        "name": "John Doe",
        "userName": "johndoe123",
        "email": "johndoe@example.com",
        "version": 2
    }
    ```

- `404 Not Found`: If the user with the specified `id` is not found, the server will respond with an error message.

    Example Error Response:
    ```json
    {
        "error": "User Not Found"
    }
    ```

- `4xx Error`: If there are any other errors during the retrieval process, the server will respond with an appropriate error message.

    Example Error Response:
    ```json
    {
        "error": "An error occurred while fetching user information."
    }
    ```