<?xml version="1.0" encoding="UTF-8"?> <!-- Declaración XML para definir la versión y codificación -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <!-- Definición de la hoja de estilo XSLT y el espacio de nombres XSL -->
  <xsl:output method="html" encoding="UTF-8" indent="yes"/> <!-- Configura la salida para que sea HTML, con codificación UTF-8 y con indentación para facilitar la lectura -->

  <xsl:template match="/"> <!-- La plantilla se aplica al nodo raíz del documento XML -->
    <html> <!-- Inicia el documento HTML -->
      <head>
        <title>Catálogo</title> <!-- Título de la página -->
        <style>
       <!-- Aquí empieza el CSS que define el estilo de la página -->
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            background: linear-gradient(to right, #d6a6f2, #ffffff);
          }
          header {
            background: linear-gradient(to right, #c08ae0, #9b46b5);
            color: white;
            padding: 20px 0;
            text-align: center;
          }
          header h1 {
            font-size: 2.5em;
          }
          nav ul {
            list-style-type: none;
            padding: 0;
            margin-top: 20px;
          }
          nav ul li {
            display: inline;
            margin-right: 20px;
          }
          nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 1.2em;
          }
          nav ul li a:hover {
            text-decoration: underline;
            color: #f2c0f2;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table th, table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            vertical-align: top;
          }
          table th {
            background-color: #9b46b5;
            color: white;
            font-size: 1.2em;
          }
          table tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          table tr:hover {
            background-color: #f0d3e3;
          }
          main {
            padding: 20px;
          }
          section {
            margin-bottom: 40px;
          }
          h2 {
            font-size: 2em;
            margin-bottom: 20px;
            color: #9b46b5;
          }
          footer {
            background-color: #9b46b5;
            color: white;
            text-align: center;
            padding: 10px 0;
            margin-top: 40px;
            font-size: 0.9em;
            font-style: italic;
          }
          img {
            max-height: 150px;
            max-width: 100px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Catálogo de Películas, Series y Libros</h1> <!-- Título principal de la página -->
        </header>
        <main> <!-- Contenido principal de la página -->

          <!-- Películas -->
          <section>
            <h2>Películas</h2> <!-- Título de la sección de películas -->
            <table> <!-- Tabla para mostrar las películas -->
              <tr>
                <th>Título</th>
                <th>Género</th>
                <th>Año</th>
                <th>Ranking</th>
                <th>Descripción</th>
                <th>Imagen</th>
              </tr>
              <xsl:for-each select="catalogo/peliculas/pelicula"> <!-- Itera sobre cada película en el catálogo -->
                <xsl:sort select="ranking" data-type="number" order="ascending"/> <!-- Ordena las películas por ranking en orden ascendente -->
                <tr> <!-- Fila de cada película -->
                  <td><xsl:value-of select="titulo"/></td> <!-- Muestra el título de la película -->
                  <td><xsl:value-of select="@genero"/></td> <!-- Muestra el género de la película -->
                  <td><xsl:value-of select="@anio"/></td> <!-- Muestra el año de la película -->
                  <td><xsl:value-of select="ranking"/></td> <!-- Muestra el ranking de la película -->
                  <td><xsl:value-of select="descripcion"/></td> <!-- Muestra la descripción de la película -->
                  <td>
                    <xsl:if test="string-length(imagen) &gt; 0"> <!-- Si la película tiene una imagen -->
                    <img src="{imagen}" alt="{titulo}"/> <!-- Muestra la imagen -->
                    </xsl:if>
                    <xsl:if test="string-length(imagen) = 0"> <!-- Si no tiene imagen -->
                    <span>No imagen</span> <!-- Muestra el mensaje "No imagen" -->
                      </xsl:if>
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </section>

          <!-- Series -->
          <section>
            <h2>Series</h2> <!-- Título de la sección de series -->
            <table> <!-- Tabla para mostrar las series -->
              <tr> <!-- Fila de cabecera -->
                <th>Título</th>
                <th>Género</th>
                <th>Año</th>
                <th>Ranking</th>
                <th>Descripción</th>
                <th>Imagen</th>
              </tr>
              <xsl:for-each select="catalogo/series/serie"> <!-- Itera sobre cada serie en el catálogo -->
                <xsl:sort select="ranking" data-type="number" order="ascending"/> <!-- Ordena las series por ranking en orden ascendente -->
                <tr> <!-- Fila de cada serie -->
                  <td><xsl:value-of select="titulo"/></td> <!-- Muestra el título de la serie -->
                  <td><xsl:value-of select="@genero"/></td> <!-- Muestra el género de la serie -->
                  <td><xsl:value-of select="@anio"/></td> <!-- Muestra el año de la serie -->
                  <td><xsl:value-of select="ranking"/></td> <!-- Muestra el ranking de la serie -->
                  <td><xsl:value-of select="descripcion"/></td> <!-- Muestra la descripción de la serie -->
                  <td>
                    <xsl:choose> <!-- Selecciona entre dos opciones -->
                      <xsl:when test="string-length(imagen) &gt; 0"> <!-- Si la serie tiene imagen -->
                        <img src="{imagen}" alt="{titulo}"/> <!-- Muestra la imagen -->
                      </xsl:when>
                      <xsl:otherwise> <!-- Si no tiene imagen -->
                        <span>No imagen</span> <!-- Muestra el mensaje "No imagen" -->
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </section>

          <!-- Libros -->
          <section>
            <h2>Libros</h2> <!-- Título de la sección de libros -->
            <table> <!-- Tabla para mostrar los libros -->
              <tr> <!-- Fila de cabecera -->
                <th>Título</th>
                <th>Género</th>
                <th>Año</th>
                <th>Ranking</th>
                <th>Descripción</th>
                <th>Imagen</th>
              </tr>
              <xsl:for-each select="catalogo/libros/libro"> <!-- Itera sobre cada libro en el catálogo -->
                <xsl:sort select="ranking" data-type="number" order="ascending"/> <!-- Ordena los libros por ranking en orden ascendente -->
                <tr> <!-- Fila de cada libro -->
                  <td><xsl:value-of select="titulo"/></td> <!-- Muestra el título del libro -->
                  <td><xsl:value-of select="@genero"/></td> <!-- Muestra el género del libro -->
                  <td><xsl:value-of select="@anio"/></td> <!-- Muestra el año del libro -->
                  <td><xsl:value-of select="ranking"/></td> <!-- Muestra el ranking del libro -->
                  <td><xsl:value-of select="descripcion"/></td> <!-- Muestra la descripción del libro -->
                  <td>
                    <xsl:choose> <!-- Selecciona entre dos opciones -->
                      <xsl:when test="string-length(imagen) &gt; 0"> <!-- Si el libro tiene imagen -->
                        <img src="{imagen}" alt="{titulo}"/> <!-- Muestra la imagen -->
                      </xsl:when>
                      <xsl:otherwise> <!-- Si no tiene imagen -->
                        <span>No imagen</span> <!-- Muestra el mensaje "No imagen" -->
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </section>

        </main>
        <footer>
          <p>2025 Cine y Series. Alba Rodriguez</p> <!-- Pie de página con información de autor -->
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
