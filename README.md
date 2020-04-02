# Avalitika API application

This project comes pre-configured with...

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. ACL
7. Validators
8. Transformers

## Setup

Use the adonis command to install the blueprint

clone the repo and then run `npm install`.

after that, run the project with `adonis serve --dev`


### Migrations

Run the following command to run startup migrations:

```js
adonis migration:run
```

To undo the last migrations and return to last batch number, do:

```js
adonis migration:rollback
```