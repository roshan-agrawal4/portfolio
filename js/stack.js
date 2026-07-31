/* ---------------------------------------------------------------------------
   TECH STACK DATA
   ---------------------------------------------------------------------------
   To add a technology, copy a line and change the values.

     name   -> label shown under the icon
     cat    -> one of: lang | backend | data | infra | tools
     icon   -> URL of an SVG icon (devicon or simpleicons CDN)
     mono   -> true if the icon is black/dark and needs inverting in dark mode

   If an icon URL ever breaks, the site automatically falls back to a lettered
   badge, so nothing looks broken.
--------------------------------------------------------------------------- */

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';

window.TECH_STACK = [
  /* ----- Languages ----- */
  { name: 'Java',        cat: 'lang',    icon: `${DEVICON}/java/java-original.svg` },
  { name: 'C++',         cat: 'lang',    icon: `${DEVICON}/cplusplus/cplusplus-original.svg` },
  { name: 'C',           cat: 'lang',    icon: `${DEVICON}/c/c-original.svg` },
  { name: 'Python',      cat: 'lang',    icon: `${DEVICON}/python/python-original.svg` },
  { name: 'Go',          cat: 'lang',    icon: `${DEVICON}/go/go-original-wordmark.svg` },

  /* ----- Backend ----- */
  { name: 'Spring Boot', cat: 'backend', icon: `${DEVICON}/spring/spring-original.svg` },
  { name: 'Spring JPA',  cat: 'backend', icon: `${SI}/springboot` },
  { name: 'Hibernate',   cat: 'backend', icon: `${DEVICON}/hibernate/hibernate-original.svg` },
  { name: 'Maven',       cat: 'backend', icon: `${DEVICON}/maven/maven-original.svg` },
  { name: 'JUnit',       cat: 'backend', icon: `${DEVICON}/junit/junit-original.svg` },
  { name: 'REST APIs',   cat: 'backend', icon: `${SI}/openapiinitiative`, mono: true },

  /* ----- Data & Messaging ----- */
  { name: 'SQL',         cat: 'data',    icon: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg` },
  { name: 'PostgreSQL',  cat: 'data',    icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'Redis',       cat: 'data',    icon: `${DEVICON}/redis/redis-original.svg` },
  { name: 'RabbitMQ',    cat: 'data',    icon: `${DEVICON}/rabbitmq/rabbitmq-original.svg` },
  { name: 'ClickHouse',  cat: 'data',    icon: `${SI}/clickhouse` },
  { name: 'Milvus',      cat: 'data',    icon: `${SI}/milvus` },
  { name: 'Qdrant',      cat: 'data',    icon: `${SI}/qdrant`, mono: true },
  { name: 'BigQuery',    cat: 'data',    icon: `${SI}/googlebigquery` },

  /* ----- Infra & DevOps ----- */
  { name: 'Kubernetes',  cat: 'infra',   icon: `${DEVICON}/kubernetes/kubernetes-original.svg` },
  { name: 'GKE',         cat: 'infra',   icon: `${SI}/googlecloud` },
  { name: 'Docker',      cat: 'infra',   icon: `${DEVICON}/docker/docker-original.svg` },
  { name: 'Helm',        cat: 'infra',   icon: `${DEVICON}/helm/helm-original.svg` },
  { name: 'Linux',       cat: 'infra',   icon: `${DEVICON}/linux/linux-original.svg` },
  { name: 'GitHub Actions', cat: 'infra', icon: `${DEVICON}/githubactions/githubactions-original.svg` },
  { name: 'Prometheus',  cat: 'infra',   icon: `${DEVICON}/prometheus/prometheus-original.svg` },
  { name: 'Grafana',     cat: 'infra',   icon: `${DEVICON}/grafana/grafana-original.svg` },

  /* ----- Tools ----- */
  { name: 'Git',         cat: 'tools',   icon: `${DEVICON}/git/git-original.svg` },
  { name: 'GitHub',      cat: 'tools',   icon: `${DEVICON}/github/github-original.svg`, mono: true },
  { name: 'Postman',     cat: 'tools',   icon: `${DEVICON}/postman/postman-original.svg` },
  { name: 'Playwright',  cat: 'tools',   icon: `${DEVICON}/playwright/playwright-original.svg` },
  { name: 'Copilot',     cat: 'tools',   icon: `${SI}/githubcopilot`, mono: true },
  { name: 'Cursor',      cat: 'tools',   icon: `${SI}/cursor`, mono: true },
  { name: 'Claude Code', cat: 'tools',   icon: `${SI}/claude` },
];
