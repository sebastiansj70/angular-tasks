# Task Management App

## Descripción

Esta es una aplicación web desarrollada en **Angular 16** para la **gestión de tareas y personas responsables**. Permite agregar, editar y eliminar tareas, asignar personas responsables, y gestionar habilidades necesarias para cada tarea. Además, utiliza `json-server` como backend simulado para manejar la persistencia de datos de las tareas.

## Características

- **Agregar Tareas**: Crea nuevas tareas con título, descripción, fecha límite y personas asignadas.
- **Editar Tareas**: Modifica las tareas existentes, cambia su estado de completado y asigna nuevas habilidades.
- **Eliminar Tareas**: Elimina tareas de la lista.
- **Gestionar Personas y Habilidades**: Asigna personas a las tareas y gestiona las habilidades necesarias para completar dichas tareas.
- **Responsive Design**: La interfaz se adapta a diferentes tamaños de pantalla.

## Requisitos

Para ejecutar esta aplicación, necesitas tener instalado:

- [Node.js](https://nodejs.org/) v14 o superior
- [Angular CLI](https://angular.io/cli) v16 o superior
- [json-server](https://www.npmjs.com/package/json-server) para simular un backend

## Instrucciones para la instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/usuario/task-management-app.git
   cd task-management-app

2. Instala las dependencias del proyecto:
    ```bash
    npm install

3. Instala json-server globalmente si no lo tienes instalado:
    ```bash
    npm install -g json-server
4. Inicia el servidor JSON para el backend simulado:
    ```bash
    json-server --watch src/assets/data.json --port 3000
5. En otra terminal, ejecuta la aplicación Angular:
    ```bash
    ng serve
6. Abre tu navegador en http://localhost:4200 para ver la aplicación en funcionamiento.
    ```bash

## Estructura del proyecto

La estructura básica del proyecto es la siguiente:

src/
├── app/
│   ├── components/
│   ├── services/
│   └── models/
├── assets/
├── environments/
├── index.html
├── main.ts
└── styles.scss

## Backend Simulado

La aplicación utiliza **json-server** para simular una API REST con los datos de las tareas. El archivo **data.json** en **src/assets** contiene los datos iniciales y simula las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las tareas.

## Comandos Útiles

- **ng serve**: Inicia el servidor de desarrollo en Angular.
- **json-server --watch src/assets/data.json --port 3000**: Inicia el servidor JSON para simular el backend en el puerto 3000.
- **npm run build**: Compila la aplicación para producción en la carpeta dist/

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama con tu funcionalidad o mejora.
3. Realiza un pull request cuando estés listo para fusionar los cambios.