# Schema

| Users         | Type          |
| ------------- |:-------------:|
| id            | int           |
| email_address | string        |
| username      | string        |

| Games         | Type          |
| ------------- |:-------------:|
| id            | int           |
| host_id       | int           |
| started_at    | timestamp     |
| completed_at  | timestamp     |

| Rolls         | Type          |
| ------------- |:-------------:|
| id            | int           |
| dice_1        | int           |
| dice_2        | int           |

| Events          | Type          |
| --------------- |:-------------:|
| id              | int           |
| name            | string        |
| description     | string        |

| Spaces            | Type          |
| ----------------- |:-------------:|
| id                | int           |
| position          | int           |
| property_id       | int           |
| event_id          | int           |

| Tokens        | Type          |
| ------------- |:-------------:|
| id            | int           |
| name          | string        |

| Players        | Type          |
| -------------- |:-------------:|
| id             | int           |
| game_id        | int           |
| user_id        | int           |
| token_id       | int           |
| cash           | int           |
| space_id       | int           |
| initial_roll_id| int           |

| *Color_Sets*    | Type          |
| --------------- |:-------------:|
| id              | int           |
| color           | string        |

| *Properties*       | Type          |
| ------------------ |:-------------:|
| id                 | int           |
| color_set_id       | int           |
| name               | string        |
| *buy_price*        | int           |
| *rent_price*       | int           |
| *mortgage_value*   | int           |

| *Purchases*   | Type          |
| ------------- |:-------------:|
| id            | int           |
| player_id     | int           |
| property_id   | int           |
| purchase_price| int           |
| purchase_type | int           |

| *Deeds*       | Type          |
| ------------- |:-------------:|
| id            | int           |
| property_id   | int           |
| player_id     | string        |
| mortgaged     | bool          |
