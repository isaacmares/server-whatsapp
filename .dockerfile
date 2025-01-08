# Usa la imagen oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "index.js"]
