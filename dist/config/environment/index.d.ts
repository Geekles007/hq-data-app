declare const port: string | undefined;
declare const env: {
    development: boolean;
    test: boolean;
    staging: boolean;
    production: boolean;
    host: string | undefined;
    db_name: string | undefined;
    username: string | undefined;
    port: string | undefined;
    password: string | undefined;
    email: string | undefined;
    passwordGmail: string | undefined;
};
export { port, env };
