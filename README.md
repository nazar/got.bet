# GoT Bet

Here lies the source code for the [got.bet](http://got.bet) website.

## Developmer setup

1. Get [Docker](https://www.docker.com/get-started)
2. If you are on macOS, get [docker-sync](http://docker-sync.io/) for faster file
syncs and container IO. If you are on linux, please add a `docker-compose.override.yml` 
file to override the project docker-compose services, specifically mapping the volumes 
for `client` and `api` services. Sorry Windows users; you're on your own on this one.
3. If using `docker-sync`, use `docker-sync start && docker-compose up` to start the local
development environment. 
4. Point your browser at http://localhost:5006
5. ?
6. Profit
