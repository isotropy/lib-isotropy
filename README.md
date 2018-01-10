# Isotropy

### Installation

```bash
npm i -g isotropy
```

### Commands

Initialize a project

```bash
isotropy init <dir>
```

Create a project from a template

Run a project in dev mode locally.

```bash
isotropy run
```

Deploy a Project to the Cloud. The Cloud must implement Isotropy Deployment Specification 1.0 APIs.
By default, it is set to www.looptype.com. To change the defaults, edit cloud.json in the ~/.isotropy directory.

```bash
isotropy deploy
```

Deploy to a specific cloud (as defined in cloud.json) with:

```bash
isotropy deploy <cloud_name>
```

### Example YAML File

```yaml
name: Simple Todos
schema: "1.0"
version: "1.0.0"
git: https://github.com/isotropy/simple-todos
servers:
  - name: server
    type: http
    build:
      - static
      - client
      - server
    locations:
      - location: /
        type: nodejs
        main: /server/index.js
      - location: /static
        type: static
        path: /static
  - name: auth-server
    type: http
    build:
      - auth-server
    locations:
      - location: /
        type: nodejs
        main: /server/index.js
builds:
  static:
    type: copy
    dest: /static
  client:
    type: typescript
    bundle: yes
    output: /static/client.js
  server:
    type: typescript
    output: /server  
    connections:
      - type: webdisk
        path: ./disk.ts
        disk: todos
      - type: postgres
        path: ./db.ts
        db: todosdb
      - type: redis
        path: ./redis.ts
        db: todoscache
  auth-server:
    type: typescript
    output: /auth-server  
    connections:
      - type: postgres
        path: ./db.ts
        db: authdb
```