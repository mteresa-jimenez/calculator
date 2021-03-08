# Calculator

This is a case study for the selection process for **PolyPoly**. This project has been developed with **vanilla JavaScript, HTML5, CSS/SASS**.

## Development

For this exercise, I have been given an existing code base for a calculator web app to which I had to make several changes to solve several problems.

> 1. **Improve the product:**

- *Responsive design - mobile first:*

In order to improve the design and make the calculator look like the [mobile mokup](https://github.com/mteresa-jimenez/calculator/blob/code-improvement/mockups/mobile.png), I changed the appearance using CSS styles, specifically "CSS grid" to rearrange the order of the buttons.

Then, using mediaqueries to adapt the design to desktop screens and make the calculator look like the [desktop mokup](https://github.com/mteresa-jimenez/calculator/blob/code-improvement/mockups/desktop.png).

- *Introduction of touch event for mobile version:*

To trigger the behaviour of the C button when user swipes the display field from right to left, I introduced a "touchstart" and "touchend" event. When the end point represents a smaller number in the X axis, the event calls the function that clears the display.

- *Allow keyboard for desktop version:*

I created two functions: one to handle the keydown event and another one to listen it. In the first one, there are several ``ev.key``, one for each button in the calculator.

- *Simulation of buttons being pressed:*

First, the buttons color had to change to simulate being pressed. To the previous keydown funtion, I added a ``style.backgroundColor`` to each ``ev.key``. 
When the keydown event is finished, the button must recover its original color. I created a second handle function for a keyup event, setting the background color of each button to the oringinal using again an ``ev.key`` for each button.


> 2. **Improve the code:**

- *Abstract handle functions:*

In the original code base, each "click" event had an anonymous function inside each ``addEventListenet``. In order to be able to reuse these functions in the different events, I divided each one in a separated one and renamed them.




Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más. El Kit nos ayuda a trabajar más cómodamente, nos automatiza tareas.

En el Kit hay 3 tipos de ficheros y carpetas:

- Los ficheros que están sueltos en la raíz del repositorio, como gulpfile.js, package.json... Son la configuración del proyecto y no necesitamos modificarlos.
- La carpeta `src/`: son los ficheros de nuestra página web, como HTML, CSS, JS...
- Las carpetas `public/` y `docs/`, que son generadas automáticamente cuando arrancamos el proyecto. El Kit lee los ficheros que hay dentro de `src/`, los procesa y los genera dentro de `public/` y `docs/`.

## Guía de inicio rápido

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) para trabajar con este Starter Kit:

### Pasos a seguir cada vez que queremos arrancar un proyecto desde cero:

1. **Crea tu propio repositorio.**
1. Descarga este **Starter kit desde GitHub**.
   - No recomendamos que clones este repo ya que no podrás añadir commits.
1. **Copia todos los ficheros** de este Starter kit en la carpeta raíz de tu repositorio.
   - Recuerda que debes copiar **también los ficheros ocultos**.
   - Si has decidido clonar este repo, no debes copiar la carpeta `.git`. Si lo haces estarás machacando tu propio repositorio.
1. **Abre una terminal** en la carpeta raíz de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra tu página web**, al igual que hace el plugin de VS Code Live Server (Go live).
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
   - Convierte los ficheros SASS en CSS.
   - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

### Pasos para publicar el proyecto en GitHub Pages:

Para generar tu página para producción ejecuta el comando:

```bash
npm run docs
```

Y a continuación:

1. Sube a tu repo la carpeta `docs/` que se te acaba de generar.
1. Entra en la pestaña `settings` de tu repo.
1. Y en el apartado de GitHub Pages activa la opción **master branch /docs folder**.
1. Y ya estaría!!!

Además, los comandos:

```bash
npm run push-docs
```
o

```bash
npm run deploy
```

son un atajo que nos genera la versión de producción y hace push de la carpeta `docs/` del tirón. Te recomendamos ver el fichero `package.json` para aprender cómo funciona.

## Flujo de archivos con Gulp

Estas tareas de Gulp producen el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)

## `gulpfile.js` y `config.json`

Nuestro **gulpfile.js** usa el fichero `config.json` de configuración con las rutas de los archivos a generar / observar.

De esta manera separarmos las acciones que están en `gulpfile.js` de la configuración de las acciones que están en `config.json`.

## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
src
 ├─ api // los ficheros de esta carpeta se copian en public/api/
 |  └─ data.json
 ├─ images
 |  └─ logo.jpg
 ├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js
 |  ├─ main.js
 |  └─ events.js
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ layout
 |  └─ pages
 └─ html
    └─ partials
```

> **NOTA:** Los partials de HTML y SASS del proyecto son orientativos. Te recomendamos usar los que quieras, y borrar los que no uses.

## Vídeotutoriales del Starter kit

- [Qué es, trabajar con la versión de desarrollo y rutas relativas](https://www.youtube.com/watch?v=XwvhXvBijos)
- [Migración de un proyecto, trabajar con la versión de producción y GitHub Pages](https://www.youtube.com/watch?v=qqGClcgt9Uc)
- [Motor de plantillas](https://www.youtube.com/watch?v=4GwXOJ045Zg)

## Falta algo?

Echas de menos que el kit haga algo en concreto? Pidelo sin problema a través de las issues o si te animas a mejorarlo mándanos un PR :)
