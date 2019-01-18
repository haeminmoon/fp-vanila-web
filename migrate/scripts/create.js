/**
 * User table
 * */
const createUser = () => QUERY `
    CREATE TABLE user (
        id character varying(30) PRIMARY KEY,
        pw character varying(30) NOT NULL,
        info jsonb NOT NULL,
        auth character varying(20) NOT NULL,
        created_at timestamp without time zone NOT NULL,
        updated_at timestamp without time zone,
        deleted_at timestamp without time zone
    );    
`;

module.exports = {

}