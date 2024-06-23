FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y las dependencias de la aplicación al contenedor
COPY package*.json /app

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . /app

# Construye la aplicación Angular
RUN npm run build --prod

# Expone el puerto que la aplicación usará
EXPOSE 4200

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["npm", "start"]
