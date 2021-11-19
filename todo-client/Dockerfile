FROM node:14-alpine
WORKDIR /app
ENV PUBLIC_URL /todo

COPY . ./
RUN ["yarn", "build:prod"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html/todo

WORKDIR /usr/share/nginx/html
COPY ./env.sh .

RUN chmod +x env.sh

EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
