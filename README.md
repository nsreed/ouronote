# ouronote

Real-time collaborative whiteboard web app built with [Angular](https://angular.io/), [GUN](https://gun.eco/), and [paper.js](http://paperjs.org/).

![per-user permissions](./docs/sync-permissions-demo.gif)

Drawings are publicly accessible (between your peers), but only users you invite may edit them.

## Running the project

### Prerequisites

**Install Required Software**

- node
- Yarn / NPM package manager
- Docker (optional)

**Clone this project**

```
git clone https://github.com/nsreed/ouronote.git

cd ouronote
```

**Install Packages**

_note: `npm` should also work for the following commands_

```
yarn install
```

### Run Ouronote

**docker-compose**

This is useful for testing on local network devices, such as tablets.

1. Generate self-signed certs (required for access outside localhost)

```
openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out ouronote-dev.crt -keyout ouronote-dev.key
```

2. Build the project

```
yarn build:all
```

3. Run the docker container

```
docker-compose up -d
```

Navigate to <https://[YOUR IP]:4430> or <http://localhost:8080>

### Development

#### Using Docker

1. Run the above steps for docker-compose.
2. Run `yarn build:watch`

#### Using Angular CLI

For the time being, a GUN relay peer is required on `localhost:8765`.

- To run a local peer using Docker, you may either follow the instructions for docker-compose above, or run `docker run -p 8765:8765 gundb/gun`
- Or follow the [GUN Installation documentation](https://gun.eco/docs/Installation#node)

Run `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Disclaimers

This project is in early experimental development. One could even call it a proof of concept. As such, please be aware:

- Future versions may not be backwards compatible
- Project has issues with Firefox/Safari. Chrome/chromium works best

Use at your own discretion!

## `// TODO`

We have a roadmap in the [github wiki](https://github.com/nsreed/ouronote/wiki/Roadmap)
