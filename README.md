# Introduction

This is a basic rest api server made with nodejs and express, it uses MongoDB and mongoose for managing it.

# Instalation

Run npm install in the folder where the package.json is.

Then use a tool like nodemon to run the server.

You will need to connect to a db from mLab

You will need to provide an .env file and set it up like this (example.env provided):
```
PORT=8080

MONGODB_CNN= connection url

SECRET_OR_PRIVATE_KEYS=Key for the token validation, must be something like if your cat walks on your keyboard "divbadsiobvoieOBFBibi·&%)rh545))o hd)"rBFWIWQBHEF928"
```
remember to give network access to your db as public

# Endpoints

## CREATE USER

POST ../users/

request:

```
{
	"name":"Test1",
	"email": "test1@test.com",
	"password": "123456",
	"img": "avatar image url",
	"role": "USER_ROLE",
	"status": "true",
	"google": "false"

} 
```

name, email, password, and role are required

name: (REQUIRED) any string

email: (REQUIRED) must be a valid and UNIQUE email

password: (REQUIRED) must be at least 6 characters long

img: user avatar img url (can be any string really)

role: (REQUIRED) can be USER_ROLE, ADMIN_ROLE or SALES_ROLE, only ADMIN_ROLE and SALES_ROLE will be able to use DELETE endpoint

status: define if user is active or not, users are not deleted from database, their status are set to false instead, if not provided status will be true by default.

google: (not implemented yet) defines if user was created by google or not, if not provided google will be false as default.

response:

id is created by mongo
```
{
	"status": true,
	"google": false,
	"name": "Test1",
	"email": "test1@test.com",
	"img": "avatar image url",
	"role": "USER_ROLE",
	"id": "6106fb5a8ba64224ba09bd90"
}
```
##LOGIN

POST ../auth/login

request:
```
{
	"email": "test1@test.com",
	"password": "123456"
}
```
response:

The server will check if it is a valid email and if the password is not empty, if user exists (status: true) and password matches it will return the authenticated user detais and the authentication token:
```
{
	"user": {
	"status": true,
	"google": false,
	"name": "Test1",
	"email": "test1@test.com",
	"role": "USER_ROLE",
	"id": "60f04d76e1c1a928db78c9b6"
},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjA0ZDc2ZTFjMWE5MjhkYjc4YzliNiIsImlhdCI6MTYyNzg0NjY2MSwiZXhwIjoxNjI3ODYxMDYxfQ.HocRpNfljR0Vi0Ys8OvleTC1XIKlmYnFimx8C5hdqyc"
}
```
## GET USERS LIST

GET ".../users/"

must send a valid token in headers KEY: "token".

response:
```
{

    "total": number: total records including those whom status is false
    "data": Array: first 5 users, those with status:false will not be shown

}
```
GET ".../users/?limit=<number>"

example:

GET ".../users/?limit=15"

response:
```
{

    "total": number: total records including those whom status is false
    "data": Array: first <number> users, those with status:false will not be shown

}
```
GET ".../users/?from=<number>"

example GET ".../users/?from=5"

response:
```
{

    "total": number: total records including those whom status is false
    "data": Array: first 5 users from 5th position, those with status:false will not be shown

}
```
GET ".../users/?limit=<number>&&from=<number>"

example:

GET ".../users/?limit=10&&from=5"

response:
```
{

    "total": number: total records including those whom status is false
    "data": Array: first 10 users from 5th position, those with status:false will not be shown

}
```
## GET SINGLE USER

GET ".../users/id"

must send a valid token in headers KEY: "token".

id must be a valid mongo id and, of course must exists if it doesn't it will response will be:
```
{
	"errors": [
		{
		"value": "notValidMongoId",
		"msg": "not a valis id",
		"param": "id",
		"location": "params"
		},
			{
			"value": "notValidMongoId",
			"msg": "Cast to ObjectId failed for value \"notValidMongoId\" (type string) at path \"_id\" for model \"User\"",
			"param": "id",
			"location": "params"
			}
		]
}
```
or
```
{
		"errors": [
		{
		"value": "60f04d65e1c1a928db78c9a2",
		"msg": "the id: 60f04d65e1c1a928db78c9a2 does not exists",
		"param": "id",
		"location": "params"
		}
	]
}
```
## MODIFY USER

PUT ".../users/id"

Must send a valid token in headers KEY: "token" and the user the token is generated for must have ADMIN_ROLE or SALES_ROLE for being able to modify an user, if not, an error 401 will be sent un the response.

id must be a valid mongo id and, of course must exists in the db.

request:

example: PUT ".../users/60f04d7ee1c1a928db78c9ba"
```
{
	"name":"Paco",
	"email": "test4@test.com",
	"password": "123456",
	"img": "img url",
	"role": "ADMIN_ROLE",
	"status": "true",
	"google": "false"

}
```
response:
```
{
	"msg": "user updated",
	"user": {
	"status": true,
	"google": false,
	"name": "Paco",
	"email": "test4@test.com",
	"role": "ADMIN_ROLE",
	"img": "img url",
	"id": "60f04d7ee1c1a928db78c9ba"
	}
}
```
## DELETE USER

DELETE ".../users/id"

This doesnt delete the record from the database, it sets {"status": false}

Must send a valid token in headers KEY: "token" and the user the token is generated for must have ADMIN_ROLE or SALES_ROLE for being able to delete an user, if not, an error 401 will be sent un the response.

id must be a valid mongo id and, of course must exists in the db.

example:

DELETE ".../users/60f04d7ee1c1a928db78c9ba"

response:
```
{
	"user": {
	"status": false,
	"google": false,
	"name": "Test4",
	"email": "test4@test.com",
	"role": "USER_ROLE",
	"img": "imgagen dde mis huevos",
	"id": "60f04d7ee1c1a928db78c9ba"
	}
}
```
