import { MemcacheClient } from "memcache-client";

// Configurando o servidor Memcached para usar o endereço padrão (localhost:11211)
const server = "localhost:11211";
const memcacheClient = new MemcacheClient({ server });

export default memcacheClient;