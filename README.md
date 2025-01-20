# Docker Node MongoDB Example

> Simple example of a dockerized Node/Mongo app

![Image](https://i.ibb.co/4Fgt31L/demo.gif)

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```
## Docker plan
> Familiarizing myself with Docker commands and its core concepts has helped me realize that I will likely need it when working in a team, and I'll use it more in that context. I reached this conclusion after struggling to deploy my project to Render for free without success. For now, I’ll leave it as it is.
