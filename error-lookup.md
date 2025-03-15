# Error Lookup

I read somewhere that it's a good idea to have an error lookup page for your API. Here's one I made for this project.

| Status Code | Error Name | Error Message | Custom Message (Shown to end-user) | 
| --- | --- | --- | --- |
| 400 | Bad Request | The request was invalid or cannot be otherwise processed. | See the section on [Customized Error Messages](#bad-request) |
| 401 | Unauthorized Request | The request failed authentication or authorization. | See the section on [Customized Error Messages](#unauthorized-request) |
| 404 | Not Found | The requested resource could not be found. | See the section on [Customized Error Messages](#not-found) |
| 409 | Conflict | The request conflicts with another request or the current state of the resource. | The data already exists. (Prisma generated, altered.) |
| 422 | Validation Error | Invalid or incomplete data provided. | See the section on [Customized Error Messages](#validation-error) | 
| 500 | InternalServerError | See the section on [Internal Server Error](#internal-server-error) | - |

After looking at some other error tables, I saw the use of customized error codes. Unfortunately, I had already
finished with my backend stuff by then so I'll try and use that approach in my future projects.

## Internal Server Error

This is the default error type when the encountered error doesn't fall into any of the 
other above-mentioned categories.

I have tried to handle all the non-server errors (<500) within the other error types.  
Mostly, this error will occur if there are any database connection issues, Prisma errors, etc.

## Customized Error Messages (Shown to end-user)

### Bad Request

- We couldn't find the Pokémon/Trainer you're looking for. Please try again.
- The resource you're trying to access/delete does not exist!

### Unauthorized Request

While this project doesn't have any login/sign-up system, deleting a Pokémon/Trainer requires a
secret key. This error is thrown when the secret key entered is wrong.
- `message`: The secret key is invalid. `field`: secretKey

### Not Found

- Oops! It seems there are no Pokémon/Trainers. (For list fetch request.)
- Oops! The pokémon/trainer you're looking for does not exist. (For single element fetch request.)
- This is not the webpage you are looking for.

### Validation Error

- `message`: Please provide a trainer name. `field`: trainerName
- `message`: Please provide a Pokémon name. `field`: pokemonName
- `message`: At least one Pokémon type is required. `field`: pokemonTypes
- `message`: Maximum two Pokémon types are allowed. `field`: pokemonTypes
- `message`: Please provide two different Pokémon types. `field`: pokemonTypes
- The provided data exceeds the maximum allowed length. (Prisma generated, altered. Shown as error message.)
