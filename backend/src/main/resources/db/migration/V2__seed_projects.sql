INSERT INTO project (slug, title, description, tags, repo_url, display_order, featured) VALUES
(
    'portfolio',
    'Portfólio full stack',
    'Este site: front-end em React consumindo uma API REST própria em Spring Boot, com PostgreSQL, Flyway, testes e documentação Swagger.',
    ARRAY['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
    'https://github.com/zdviana/portfolio',
    1,
    TRUE
),
(
    'estufa-iot',
    'Estufa automatizada IoT (TCC)',
    'Monitoramento e controle de temperatura, umidade e iluminação com Arduino e sensores, com interface web em tempo real.',
    ARRAY['Arduino', 'C/C++', 'Node.js', 'JavaScript', 'PHP'],
    NULL,
    2,
    FALSE
),
(
    'agenda-estagio',
    'Sistema de agenda (estágio)',
    'Agenda com calendário desenvolvida no estágio na CPT-Software: front-end em React e back-end em Node.js com Docker. Código pertence à empresa.',
    ARRAY['React', 'Node.js', 'Docker', 'MySQL'],
    NULL,
    3,
    FALSE
);
