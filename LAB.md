<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Ripe Banana
===

## Description

For this assignment, you'l be creating a database of movie films (with reviews) and the studios 
that made them as well as the actors in the film.

**You must work in groups of 2-3 on this lab**

### Models

<img alt="models" src="/models.jpg" height="150">

#### Studio

```
{
  name: <name-of-studio>,
  address: {
    city: city
    state: state
    country: country
  }
}
```

#### Film

```
{
  title: <name-of-film>,
  studio: <fk-to-studio>,
  released: <date-with-year>
  actors: [fk-to-actor],
  reviews: [
    review-subdocument
  ]
}
```

#### Actors

```
{ 
  name: <name>,
  dob: <date-of-birth>
}
```

#### Reviews

```
{ 
  rating: <number 1-5>,
  review: <review-text, max-length 140 chars>
}
```

### Routes

#### GET

route | returns
---|---
`GET /studios` | [ { name } ]
`GET /studios/:id` | { name, address, films: [ title ] }
`GET /films` | [{ title, studio.name }]
`GET /films/:id` | { title, studio.name, actors: [ name ] }
`GET /actors` | [{ name, dob }]
`GET /actors/:id` | { name, dob }

#### POST/PATCH

Studio, Films, and Actors can be added or updated.

Actors and reviews are added to films by updating the film.

#### DELETE

Studio, Films, and Actors can be deleted. However, studios cannot be deleted if there are films and
actors cannot be deleted who are in films.

## Testing

* Write appropriate model and E2E/API tests.

## Bonus

Move your population logic for films into the film schema.

## Rubric:

* Models: 5pts
* Relationships: 5pts
* Routes: 5pts
* Project Organization and Testing: 5pts
