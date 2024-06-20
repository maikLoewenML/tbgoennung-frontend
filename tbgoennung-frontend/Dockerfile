# Verwende ein Node.js-Image für den Build-Prozess
FROM node:20 as build

WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes und baue das Angular-Projekt
COPY . .
RUN npm run start

# Verwende ein Nginx-Image für die Bereitstellung
FROM nginx:alpine
COPY --from=build /app/dist/tbgoennung-frontend /usr/share/nginx/html

# Exponiere den Standard-Nginx-Port
EXPOSE 80

# Kein CMD erforderlich, da das Standardverhalten von Nginx ausreichend ist
