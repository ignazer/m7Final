# Estrategia de despliegue continuo (1.5 puntos)

## Selección del tipo de despliegue (Rolling, Blue-Green, Canary)

Para la plataforma de navegación portuaria, se recomienda utilizar el despliegue Rolling Update. Este tipo de deploy permite actualizar gradualmente las instancias de los microservicios sin interrumpir el servicio, asegurando alta disponibilidad y minimizando el tiempo de downtime. Rolling Update es ideal para sistemas que requieren continuidad operativa y donde la interrupción del servicio puede afectar la seguridad y eficiencia portuaria. 

Alternativamente, para actualizaciones críticas, se puede considerar Blue-Green Deployment, permitiendo un cambio rápido entre versiones y una fácil reversión en caso de fallos.

## Justificación de la elección de herramientas CI/CD (AWS CodeDeploy, GitHub Actions, Jenkins)

Se elige GitHub Actions como herramienta principal de CI/CD por su integración nativa con los repositorios de código en github, facilidad de configuración y soporte para flujos de trabajo automatizados. GitHub Actions permite construir, testear y desplegar la plataforma de manera automatizada en cada commit o pull request.

Además, su integración con otros servicios cloud y herramientas de orquestación (como Kubernetes y Jenkins) facilita la gestión de pipelines complejos y la trazabilidad de los despliegues.

## Estrategias de rollback y recuperación ante fallos

Para garantizar la continuidad de la plataforma, se implementan estrategias de rollback automáticas en los pipelines de CI/CD. En caso de detectar fallos durante el despliegue (por ejemplo, errores en los tests, fallos de salud en los pods o problemas de conectividad), el sistema revierte automáticamente a la versión estable anterior. En despliegues Rolling o Blue-Green, esto se logra manteniendo la versión previa activa hasta confirmar la estabilidad de la nueva. Además, se recomienda mantener backups regulares de la base de datos y registros de auditoría para facilitar la recuperación ante incidentes mayores.

Se recomienda tener un Disaster Recovery Plan.

# Configuración de entornos y seguridad en despliegues (1.5 puntos)

## Diferenciación de entornos DEV, STAGING, TEST y PRD

La plataforma debe contar con entornos claramente diferenciados para cada etapa del ciclo de vida:

- **DEV (Desarrollo)**: Entorno para desarrollo activo, pruebas unitarias y validación inicial de nuevas funcionalidades. Permite cambios frecuentes y pruebas rápidas.
- **TEST (Pruebas)**: Usado para pruebas funcionales y de integración, simulando condiciones más cercanas a producción, pero sin datos reales.
- **STAGING (Pre-producción)**: Réplica casi exacta del entorno de producción, utilizada para pruebas finales, validación de despliegues y pruebas de usuario antes de pasar a producción.
- **PRD (Producción)**: Entorno en el que opera la plataforma en tiempo real, con datos reales, máxima seguridad y disponibilidad.

## Gestión de credenciales y secretos en entornos de producción

En producción, la gestión de credenciales y secretos debe realizarse mediante herramientas especializadas como AWS Secrets Manager, HashiCorp Vault o Kubernetes Secrets. Estos servicios permiten almacenar, rotar y auditar accesos a contraseñas, tokens y claves de API de forma segura, evitando su exposición en el código fuente o archivos de configuración. El acceso a los secretos debe estar restringido por roles y políticas de mínimo privilegio.

## Consideraciones de seguridad en el pipeline de despliegue

El pipeline de despliegue debe incorporar controles de seguridad en cada etapa:

- Escaneo automático de vulnerabilidades en dependencias y contenedores. 
- Validación de firmas y checksums de artefactos.
- Uso de canales cifrados (HTTPS, SSH) para la transferencia de artefactos y despliegues.
- Restricción de permisos en los runners/agentes de CI/CD, evitando el uso de credenciales privilegiadas salvo cuando sea estrictamente necesario.
- Auditoría y registro de todas las acciones realizadas durante el pipeline para trazabilidad y cumplimiento normativo.

# Implementación de monitoreo continuo (1.5 puntos)

## Selección de herramientas para monitoreo y observabilidad (Prometheus, Grafana, ELK, CloudWatch)

Para la plataforma propuesta se recomienda el uso de Prometheus y Grafana para la recolección y visualización de métricas, permitiendo monitoreo en tiempo real de los servicios y recursos. 

Para la gestión centralizada de logs, el stack ELK (Elasticsearch, Logstash, Kibana) es ideal, ya que facilita el almacenamiento, búsqueda y análisis de registros. 

En caso de desplegar en la nube, servicios como AWS CloudWatch pueden complementar el monitoreo, integrando métricas, logs y alertas en un solo panel. (Recomendado si el stack usa varios servicios AWS)

## Estrategia de manejo de logs y métricas

Los microservicios deben emitir logs estructurados (JSON) y métricas expuestas en endpoints compatibles con Prometheus. 

Los logs se recolectan mediante agentes (por ejemplo, Filebeat o Fluentd) y se envían a Logstash para su procesamiento y almacenamiento en Elasticsearch. 

Las métricas se recolectan periódicamente con Prometheus y se visualizan en Grafana. 

Esta estrategia permite correlacionar eventos, identificar cuellos de botella y analizar el comportamiento del sistema en tiempo real.

## Configuración de alertas y dashboards para detección de incidentes

Se deben configurar dashboards personalizados en Grafana y Kibana para visualizar el estado de los servicios, uso de recursos, tráfico y eventos relevantes. 

Las alertas automáticas deben establecerse en Prometheus y/o CloudWatch para detectar condiciones anómalas o comportamientos extraños (por ejemplo, caídas de servicios, uso excesivo de CPU/memoria, errores HTTP 5xx). 

Las alertas pueden enviarse por correo, Slack u otros canales, permitiendo una respuesta rápida ante incidentes y mejorando la operabilidad.

# Automatización y ChatOps (1.5 puntos)

## Integración de herramientas de ChatOps (Slack + Hubot, Microsoft Teams)

Para mejorar la colaboración y la respuesta ante incidentes, se recomienda integrar herramientas de ChatOps como Slack junto a bots (por ejemplo, Hubot) o Microsoft Teams con sus respectivos conectores. Estas integraciones permiten ejecutar comandos, consultar el estado de los servicios y recibir notificaciones directamente desde los canales de comunicación del equipo.

## Configuración de notificaciones automatizadas sobre estado del despliegue

El pipeline de CI/CD debe incluir pasos para enviar notificaciones automáticas a los canales de ChatOps seleccionados (Slack, Teams) cada vez que se realice un despliegue, se detecte un fallo o se complete una tarea crítica. Esto se puede lograr mediante integraciones nativas de GitHub Actions, Jenkins o scripts personalizados que utilicen webhooks o APIs de los servicios de mensajería.

## Implementación de flujos de trabajo de ChatOps para gestión de incidentes

Se deben definir flujos de trabajo que permitan, desde el chat, ejecutar acciones como reiniciar servicios, consultar logs, escalar incidentes o crear tickets de soporte. Los bots pueden ser configurados para responder a comandos específicos y automatizar tareas repetitivas, mejorando la eficiencia y reduciendo el tiempo de respuesta ante incidencias.
