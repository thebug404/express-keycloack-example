## Setup

**Initialize a Keycloack container**

```bash
docker run --name keycloack-container -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.4 start-dev
```

> [!IMPORTANT]
> Before running with the next steps, is necessary to configure Keycloak to support RBAC. Please follow this [Configure Keycloak to support RBAC](#configure-keycloak-to-support-rbac) section.

> [!TIP]
> You can avoid performing the next steps by running the project with Docker. Please follow this [Run with Docker](#run-with-docker) section.

**Configure a environment file**

```bash
cp .env.example .env
```

> [!NOTE]
> Update the `.env` file with your Keycloak configuration.

**Install dependencies**

```bash
npm install
```

**Run the application**

```bash
npm run start:ts
```

> [!NOTE]
> For make request to the API, you can use the `requests.http` file in the root of the project.

## Run with Docker

**Build the image**

```bash
docker build -t express-keycloak-example .
```

**Run the container**

```bash
docker run --name express-keycloak-example-container \
-d \
-p 3000:3000 \
-e KEYCLOAK_URL=http://localhost:8080 \
-e KEYCLOAK_REALM={realm} \
-e KEYCLOAK_CLIENT_ID={client_id} \
-e KEYCLOAK_CLIENT_SECRET={client_secret} \
express-keycloak-example
```

## Configure Keycloak to support RBAC

### Create a realm

- Create a **Realm**
- Create a **Client**
  - General setting
    - Client type = `OpenID Connect`
    - Client ID = `oidc-posvirtual-nodejs` or your choice of name.
    - Name (optional) = `OIDC POS Virtual Node.js`
    - Description (optional) = `Client for Node.js application`
    - Always display in UI = `OFF` (default)
  - Capability config
    - Client authentication = `ON`
    - Authorization = `ON`
  - Login Settings: You can leave it as default.

### Create a role

- Navigate to `Realm Roles`
- Create a list of roles
  - Admin
  - User

### Create a user

- Navigate to `Users`
- Create a new user
  - Username = `ivangm000`
  - Email = `ivangm000@domain.com`
  - First Name = `Ivan`
  - Last Name = `Guevara`
- Navigate to `Credentials`
  - Set a password
- Navigate to `Role Mappings`
  - Add the `Admin` role

### Create a scope

- Navigate to `Authorization` > `Scopes`
- Create a list of scopes
  - Read
    - Name = `read`
    - Display Name = `Read`
  - Create
    - Name = `create`
    - Display Name = `Create`
  - Update
    - Name = `update`
    - Display Name = `Update`
  - Delete
    - Name = `remove`
    - Display Name = `Remove`

### Create a resource

- Navigate to `Authorization` > `Resources`
- Create a new resource
  - Name = `batches`
  - Display Name = `Batches`
  - Type = **empty**
  - URI's = `/batches/*`
  - Authorization scopes = `view`, `create`, `update`, `remove`

### Create a Policy

- Navigate to `Authorization` > `Policies`
- Create client policy and select Choose policy type = `Role`
  - Name = `batches-create-policy`
  - Description = `Policy to create batches`
  - Roles = Choose a role = `admin` or your choice.
  - Logic = `Positive`

> [!NOTE]
> Create other role-based policies. For example, `batches-read-policy`, `batches-update-policy`, `batches-remove-policy`.

### Create a Permission

- Navigate to `Authorization` > `Permissions`
- Create a new permission
  - Name = `batches-create-permission`
  - Description = `Permission to create batches`
  - Resources = `batches`
  - Authorization Scopes = `create`
  - Policies = `batches-create-policy`
  - Decision Strategy = `Unanimous`

> [!NOTE]
> Create other role-based permissions. For example, `batches-read-permission`, `batches-update-permission`, `batches-remove-permission`.
