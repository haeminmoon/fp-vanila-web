!function () {
    const CREATE = {};
    CREATE.TABLE = {};
    CREATE.INDEX = {};

    /**
     * User table
     * Latest update - January 22, 2019
     */
    CREATE.TABLE.users = _ => QUERY `
        CREATE TABLE users (
            id character varying(30) PRIMARY KEY,
            pw character varying(30) NOT NULL,
            info jsonb NOT NULL,
            auth character varying(20) NOT NULL,
            created_at timestamp without time zone NOT NULL,
            updated_at timestamp without time zone,
            deleted_at timestamp without time zone,
            sns_info jsonb
        );  
    `;
    // CREATE UNIQUE INDEX user_pkey ON users(id text_ops);

    /**
     * Campaign table
     * Latest update - January 22, 2019
     */
    CREATE.TABLE.campain = _ => QUERY `
        CREATE TABLE campaign (
            id SERIAL PRIMARY KEY,
            name character varying(100) NOT NULL,
            sns_type character varying(20) NOT NULL,
            category character varying(20) NOT NULL,
            state character varying(20) NOT NULL,
            img text,
            info jsonb,
            created_at timestamp without time zone NOT NULL,
            updated_at timestamp without time zone,
            apply_start_date timestamp without time zone NOT NULL,
            notice_date timestamp without time zone NOT NULL,
            post_start_date timestamp without time zone NOT NULL,
            advertiser_id character varying(30) NOT NULL,
            apply_end_date timestamp without time zone NOT NULL,
            post_end_date timestamp without time zone NOT NULL,
            sub_img jsonb,
            influencer_id jsonb DEFAULT '{}'::jsonb
        );
    `;
    // CREATE UNIQUE INDEX campaign_pkey ON campaign(id int4_ops);

    module.exports = {
        CREATE
    }
} ();

