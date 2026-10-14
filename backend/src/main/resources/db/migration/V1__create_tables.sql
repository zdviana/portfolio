CREATE TABLE project (
    id            BIGSERIAL PRIMARY KEY,
    slug          VARCHAR(80)  NOT NULL UNIQUE,
    title         VARCHAR(120) NOT NULL,
    description   VARCHAR(400) NOT NULL,
    tags          TEXT[]       NOT NULL DEFAULT '{}',
    repo_url      VARCHAR(255),
    demo_url      VARCHAR(255),
    image_url     VARCHAR(255),
    display_order INTEGER      NOT NULL DEFAULT 0,
    featured      BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE contact_message (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(254)  NOT NULL,
    message    VARCHAR(5000) NOT NULL,
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
