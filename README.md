# Proyecto base: Panel de plantas

Este proyecto es una base didactica hecha con Vite, React y Tailwind CSS. La idea es que el grupo tenga una aplicacion visualmente agradable, para practicar consumo de datos, estados, componentes y UI.

## Objetivos de aprendizaje

- Consumir datos desde una fuente externa.
- Trabajar con `useState`, `useEffect` y renderizado condicional.
- Separar la aplicacion en componentes reutilizables.
- Representar relaciones entre tablas como `plantas`, `categorias` y `cuidados`.
- Mejorar una interfaz usando clases dinamicas de Tailwind.

## Estructura sugerida

- `src/data/mockData.js`: datos simulados para arrancar sin backend.
- `src/services/plantService.js`: capa de acceso a datos.
- `src/components/`: componentes reutilizables.
- `src/utils/plants.js`: funciones auxiliares para transformar datos.
- `src/App.jsx`: pantalla principal.

## Modelo de datos usado como referencia

La app esta pensada para consumir datos parecidos a estas tablas:

- `categorias`
- `plantas`
- `cuidados`

Esto permite explicar relaciones como:

- una categoria puede tener muchas plantas
- una planta pertenece a una categoria
- una planta puede tener muchos cuidados

## Como ejecutar el proyecto

1. Instalar dependencias con `npm install`
2. Levantar el entorno con `npm run dev`

## Lo que ya viene resuelto

- Carga inicial de datos mock.
- Tarjetas de plantas.
- Tarjetas de resumen.

## Tareas para estudiantes

### Consumo de datos

1. Se ha creado ApiBase, revisa el codigo, entiende que hace, que se busca al usar este tipo de objetos, puedes explicar que hace cada función y procedimiento
2. Reemplazar `mockData.js` por datos consumidos desde un backend real usando `fetch`, usando ApiBase.
3. Agregar estados mas completos: loading, error y reintento.
4. Crear una funcion para pedir una sola planta por id y mostrarla en una vista separada.
5. Mostrar solo los cuidados cuyo `proximo_cuidado` sea hoy o en los siguientes 7 dias.

### React

1. Construir el filtro por categoria usando `useState` y renderizado condicional.
2. Hacer que al seleccionar una planta se carguen sus datos en el panel derecho.
3. Mostrar los cuidados relacionados con la planta seleccionada.
4. Agregar un buscador por nombre o apodo usando `useState`.
5. Crear un filtro para mostrar solo plantas favoritas.
6. Separar el panel derecho en un componente `PlantDetail`.
7. Crear un formulario para registrar una nueva planta de manera local.

### React + Tailwind

1. Cambiar el color del borde o fondo de cada tarjeta segun el nivel de salud de la planta usando clases dinamicas.
2. Mostrar una barra de progreso visual para `salud` usando Tailwind y props.
3. Hacer que el boton de categoria activa tenga una animacion o transicion mas clara.
4. Disenar una version responsive mejorada para celulares donde el detalle aparezca antes del listado o en forma de modal.

## Ideas para extender en clase

- Conectar el proyecto a una API en Express o Spring Boot.
- Guardar favoritas en base de datos.
- Crear CRUD completo de plantas.
- Agregar pagina de categorias con contador de plantas.
- Agregar validaciones al formulario.
