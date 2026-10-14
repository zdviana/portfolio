-- Projetos com front e back em repositórios separados usam repo_url (front) + backend_repo_url (back).
ALTER TABLE project ADD COLUMN backend_repo_url VARCHAR(255);

UPDATE project
SET repo_url = 'https://github.com/zdviana/tcc_interface-web'
WHERE slug = 'estufa-iot';

UPDATE project
SET repo_url         = 'https://github.com/zdviana/projeto_estagio_front',
    backend_repo_url = 'https://github.com/zdviana/projeto_estagio_backend',
    description      = 'Agenda com calendário desenvolvida no estágio na CPT-Software: front-end em React com FullCalendar e API em Node.js/Express com TypeScript e MySQL.',
    tags             = ARRAY['React', 'Node.js', 'Express', 'TypeScript', 'MySQL', 'Docker']
WHERE slug = 'agenda-estagio';
