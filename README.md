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

This API allows a user to delete their own account details.

## Endpoint

`DELETE /api/users/:id`

- `:id` (required): The unique identifier of the user whose account details will be deleted.

## Authentication

To use this API, authentication is required. The user making the request must be authenticated, and their user ID must match the `:id` provided in the endpoint URL.

Example Headers:
```http
Authorization: Bearer <your-access-token>
```


# Get User Information API

This API is used to retrieve information about a user by their unique identifier. Authentication is required to access this endpoint.

## Authentication

To use this API, you must include authentication credentials in the request headers.

Example Headers:
```http
Authorization: Bearer <your-access-token>
```

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



# Get All Users API

This API is used to retrieve a list of users with limited information (email, username, name, and id). No authentication is required to access this endpoint.

## Endpoint

`GET /api/users`

## Request

- Method: `GET`

## Response

- `200 OK`: If there are users in the database, the server will respond with a JSON array containing user objects, each with details including `email`, `userName`, `name`, and `id`.

    Example Response:
    ```json
    [
        {
            "id": 1,
            "email": "user1@example.com",
            "userName": "user1",
            "name": "John Doe"
        },
        {
            "id": 2,
            "email": "user2@example.com",
            "userName": "user2",
            "name": "Jane Smith"
        }
    ]
    ```

- `200 OK` (Empty Array): If there are no users in the database, the server will respond with an empty JSON array.

    Example Response:
    ```json
    []
    ```

- `4xx Error`: If there are any errors during the retrieval process, the server will respond with an appropriate error message.

    Example Error Response:
    ```json
    {
        "error": "An error occurred while fetching user data."
    }
    ```


# Update User Profile API

This API allows an authenticated user to update their own profile information, including their name, username, email, and other attributes. Optimistic locking is applied to ensure data consistency.

## Endpoint

`PUT /api/users/:id`

- `:id` (required): The unique identifier of the user whose profile will be updated.

## Authentication

To use this API, authentication is required. The user making the request must be authenticated, and their user ID must match the `:id` provided in the endpoint URL.

Example Headers:
```http
Authorization: Bearer <your-access-token>
```

Example Request:
  ```json
  {
    "id": 1,
    "name": "Updated Name",
    "userName": "updatedusername",
    "email": "updated.email@example.com",
    "version": 2
  }
  ```

Example Response:

  '200 OK': If the user making the request is authorized to update their own profile and the update is successful, the server will respond with a JSON object containing the updated user profile data.
  ```json
  {
    "id": 1,
    "name": "Updated Name",
    "userName": "updatedusername",
    "email": "updated.email@example.com",
    "version": 3
  }
  ```

  '401 Unauthorized': If the user making the request is not authorized to update the profile (e.g., trying to update another user's profile), the server will respond with an "Unauthorized" error.

  ```json
  {
    "error": "Unauthorized"
  }
  ```

  '409 Conflict': If optimistic locking is applied and the provided version does not match the current version in the database, the server will respond with a "Conflict" error.

  ```json
  {
    "error": "Conflict - Data has been modified by another user."
  }
  ```

  '4xx Error': If there are any other errors during the update process, the server will respond with an appropriate error message.
  ```json
  {
    "error": "An error occurred while updating user profile."
  }
  ```
Example Error Response: