-- migration: create_campanias_y_milestones

-- Tabla usuarios
create table if not exists public.usuarios (
  id uuid not null primary key,
  nombre text not null,
  apellido text not null,
  correo text not null unique,
  fecha_creacion timestamp without time zone default now(),
  rol text default 'usuario'
);

-- Tabla campanias_confirmadas
create table if not exists public.campanias_confirmadas (
  id serial primary key,
  nombre text not null,
  descripcion text,
  categoria text,
  presupuesto numeric not null,
  total_recaudado numeric default 0,
  fecha_creacion timestamp without time zone default now(),
  fecha_limite timestamp without time zone,
  creador uuid references public.usuarios(id),
  estado text default 'Approved',
  imagen_url text,
  idBusy text
);

-- Tabla campanias_temporales
create table if not exists public.campanias_temporales (
  id serial primary key,
  nombre text not null,
  descripcion text,
  categoria text,
  presupuesto numeric not null,
  fecha_creacion timestamp without time zone default now(),
  creador uuid references public.usuarios(id),
  imagen_url text
);

-- Tabla milestones_confirmadas
create table if not exists public.milestones_confirmadas (
  id serial primary key,
  campania_id integer references public.campanias_confirmadas(id),
  nombre text not null,
  descripcion text,
  meta numeric not null,
  fecha_limite timestamp without time zone,
  fecha_creacion timestamp without time zone default now(),
  estado text default 'Pending'
);

-- Tabla milestones_temporales
create table if not exists public.milestones_temporales (
  id serial primary key,
  campania_id integer references public.campanias_temporales(id),
  nombre text not null,
  descripcion text,
  meta numeric not null,
  fecha_limite timestamp without time zone,
  fecha_creacion timestamp without time zone default now(),
  estado text default 'Pending'
);
