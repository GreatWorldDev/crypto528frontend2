### Guideline

copy and rename `.env.example` to `.env`

```sh
# for example
cp .env.example .env
```

```sh
# --build  , used only for the first time
# -d , detached mode
 docker-compose up --build -d
```

#### run migration

```sh
1. docker exec -it nft sh
2. npm run migration
```
