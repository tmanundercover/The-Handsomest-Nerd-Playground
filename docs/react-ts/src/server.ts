import { createServer, Model, Factory, Response } from 'miragejs';
import { faker } from '@faker-js/faker'; // Correct faker import

interface ServerConfig {
    environment?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export function makeServer({ environment = 'development' }: ServerConfig = {}) {
    return createServer({
        environment,

        models: {
            user: Model.extend<Partial<User>>({}),
        },

        factories: {
            user: Factory.extend({
                name() {
                    return `${faker.name.firstName()} ${faker.name.lastName()}`;
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
            }),
        },

        seeds(server) {
            server.createList('user', 5);
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', (schema) => {
                return schema.all('user');
            });

            this.get('/users/:id', (schema, request) => {
                const id = request.params.id;
                const user = schema.find('user', id);
                return user ? user : new Response(404, {}, { error: 'User not found' });
            });

            this.post('/users', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return schema.create('user', attrs);
            });

            this.namespace = '';
            this.passthrough();
        },
    });
}
