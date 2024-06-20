# Verwende ein Node.js-Image zum Bauen des Projekts
FROM node:14 as build

WORKDIR /app

# Kopiere package.json und package-lock.json
COPY . .

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes und baue das Angular-Projekt
COPY . .
RUN npm run build --prod

# Verwende ein Nginx-Image, um die gebaute App bereitzustellen
FROM nginx:alpine
COPY --from=build /app/dist/tbgoennung-frontend /usr/share/nginx/html

# Exponiere den Standard-Nginx-Port
EXPOSE 80

# Kein CMD erforderlich, da das Standardverhalten von Nginx ausreichend ist
