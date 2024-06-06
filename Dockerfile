FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli --max-old-space-size=250

RUN npm install --force --max-old-space-size=250

CMD ng serve --host 0.0.0.0 --port 4200 --max-old-space-size=250