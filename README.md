# ToDo
 
A full stack web application to manage Project ToDos.
Back-end framework - FastAPI with PostgreSQL database.
Front-end library - React.js using vite.

## Setup

To run the web app in your machine, download the code ZIP file or clone this repository. Then change directory to `ToDo`.
```bash
git clone https://github.com/notalanjoseph/ToDo.git
cd ToDo
```

### Front-end

- **Node.js**: Download and install version 14 or newer from [Nodejs.org](https://nodejs.org/).
- Install dependencies and Run the server using the commands:
```bash
npm install
npm run dev
```
The react app will be running at `http://localhost:5173`. Access it using a web browser.

### Database

- **PostgreSQL**: Download version 13 or newer from [PostgreSQL.org](https://postgresql.org/). Install all the components during the installation.
- **Password**: During installation, set the database superuser(postgres) password as `root`. If you want to use another password, define it in the .env file.
```bash
database_password=your_database_superuser_password
```
<!-- - **Create server**: Open pgAdmin 4 and click on `Server` -> `Register Server`. Set Name as `local postgres`, Host name as `localhost`. Use same password as before. Click Save. -->
- **Access server**: Open pgAdmin4 and click on `Servers` from the left sidebar. Access the existing server (eg- `PostgreSQL 18`) using the password from before.
- **Create database**: Right click on `Databases` -> `Create` -> `Database`. Set Database name as `ToDoDB`. Click Save.
- **Create tables**: Right click on `ToDoDB` -> `Query Tool`. Copy & paste the below queries one by one and execute by pressing `F5`:

<!-- CREATE DATABASE ToDoDB
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False; -->

```bash
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(25) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users
    OWNER to postgres; 
```
```bash 
CREATE TABLE IF NOT EXISTS public.projects
(
    id integer NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    title character varying(25) COLLATE pg_catalog."default" NOT NULL,
    owner_id integer NOT NULL,
    todos integer[],
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT projects_pkey PRIMARY KEY (id),
    CONSTRAINT projects_owners_fkey FOREIGN KEY (owner_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects
    OWNER to postgres;
```
```bash
CREATE TABLE IF NOT EXISTS public.todos
(
    id integer NOT NULL DEFAULT nextval('todos_id_seq'::regclass),
    description character varying(50) COLLATE pg_catalog."default" NOT NULL,
    status boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT todos_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.todos
    OWNER to postgres;
```


### Back-end

- **Python**: 