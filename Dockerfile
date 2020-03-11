FROM v10.16.3
RUN mkdir -p /usr/src/auditapi
WORKDIR /usr/src/auditapi
COPY package.json /usr/src/auditapi
COPY package-lock.json /usr/src/auditapi
RUN npm install
COPY . /usr/src/auditapi
EXPOSE 3010
CMD npm run server