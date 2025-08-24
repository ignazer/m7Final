// Contenido del informe (simulado desde el Markdown)
const informeContent = `
<section id="seccion1" class="section">
    <h1>Estrategia de despliegue continuo (1.5 puntos)</h1>
    
    <h2>Selección del tipo de despliegue (Rolling, Blue-Green, Canary)</h2>
    <p>Para la plataforma de navegación portuaria, se recomienda utilizar el despliegue <strong>Rolling Update</strong>. Este tipo de deploy permite actualizar gradualmente las instancias de los microservicios sin interrumpir el servicio, asegurando alta disponibilidad y minimizando el tiempo de downtime. Rolling Update es ideal para sistemas que requieren continuidad operativa y donde la interrupción del servicio puede afectar la seguridad y eficiencia portuaria.</p>
    
    <p>Alternativamente, para actualizaciones críticas, se puede considerar <strong>Blue-Green Deployment</strong>, permitiendo un cambio rápido entre versiones y una fácil reversión en caso de fallos.</p>
    
    <h2>Justificación de la elección de herramientas CI/CD (AWS CodeDeploy, GitHub Actions, Jenkins)</h2>
    <p>Se elige <strong>GitHub Actions</strong> como herramienta principal de CI/CD por su integración nativa con los repositorios de código en github, facilidad de configuración y soporte para flujos de trabajo automatizados. GitHub Actions permite construir, testear y desplegar la plataforma de manera automatizada en cada commit o pull request.</p>
    
    <p>Además, su integración con otros servicios cloud y herramientas de orquestación (como Kubernetes y Jenkins) facilita la gestión de pipelines complejos y la trazabilidad de los despliegues.</p>
    
    <h2>Estrategias de rollback y recuperación ante fallos</h2>
    <p>Para garantizar la continuidad de la plataforma, se implementan estrategias de rollback automáticas en los pipelines de CI/CD. En caso de detectar fallos durante el despliegue (por ejemplo, errores en los tests, fallos de salud en los pods o problemas de conectividad), el sistema revierte automáticamente a la versión estable anterior. En despliegues Rolling o Blue-Green, esto se logra manteniendo la versión previa activa hasta confirmar la estabilidad de la nueva. Además, se recomienda mantener backups regulares de la base de datos y registros de auditoría para facilitar la recuperación ante incidentes mayores.</p>
    
    <p><strong>Se recomienda tener un Disaster Recovery Plan.</strong></p>
</section>

<section id="seccion2" class="section">
    <h1>Configuración de entornos y seguridad en despliegues (1.5 puntos)</h1>
    
    <h2>Diferenciación de entornos DEV, STAGING, TEST y PRD</h2>
    <p>La plataforma debe contar con entornos claramente diferenciados para cada etapa del ciclo de vida:</p>
    
    <ul>
        <li><strong>DEV (Desarrollo)</strong>: Entorno para desarrollo activo, pruebas unitarias y validación inicial de nuevas funcionalidades. Permite cambios frecuentes y pruebas rápidas.</li>
        <li><strong>TEST (Pruebas)</strong>: Usado para pruebas funcionales y de integración, simulando condiciones más cercanas a producción, pero sin datos reales.</li>
        <li><strong>STAGING (Pre-producción)</strong>: Réplica casi exacta del entorno de producción, utilizada para pruebas finales, validación de despliegues y pruebas de usuario antes de pasar a producción.</li>
        <li><strong>PRD (Producción)</strong>: Entorno en el que opera la plataforma en tiempo real, con datos reales, máxima seguridad y disponibilidad.</li>
    </ul>
    
    <h2>Gestión de credenciales y secretos en entornos de producción</h2>
    <p>En producción, la gestión de credenciales y secretos debe realizarse mediante herramientas especializadas como <strong>AWS Secrets Manager</strong>, <strong>HashiCorp Vault</strong> o <strong>Kubernetes Secrets</strong>. Estos servicios permiten almacenar, rotar y auditar accesos a contraseñas, tokens y claves de API de forma segura, evitando su exposición en el código fuente o archivos de configuración. El acceso a los secretos debe estar restringido por roles y políticas de mínimo privilegio.</p>
    
    <h2>Consideraciones de seguridad en el pipeline de despliegue</h2>
    <p>El pipeline de despliegue debe incorporar controles de seguridad en cada etapa:</p>
    
    <ul>
        <li>Escaneo automático de vulnerabilidades en dependencias y contenedores.</li>
        <li>Validación de firmas y checksums de artefactos.</li>
        <li>Uso de canales cifrados (HTTPS, SSH) para la transferencia de artefactos y despliegues.</li>
        <li>Restricción de permisos en los runners/agentes de CI/CD, evitando el uso de credenciales privilegiadas salvo cuando sea estrictamente necesario.</li>
        <li>Auditoría y registro de todas las acciones realizadas durante el pipeline para trazabilidad y cumplimiento normativo.</li>
    </ul>
</section>

<section id="seccion3" class="section">
    <h1>Implementación de monitoreo continuo (1.5 puntos)</h1>
    
    <h2>Selección de herramientas para monitoreo y observabilidad (Prometheus, Grafana, ELK, CloudWatch)</h2>
    <p>Para la plataforma propuesta se recomienda el uso de <strong>Prometheus</strong> y <strong>Grafana</strong> para la recolección y visualización de métricas, permitiendo monitoreo en tiempo real de los servicios y recursos.</p>
    
    <p>Para la gestión centralizada de logs, el stack <strong>ELK (Elasticsearch, Logstash, Kibana)</strong> es ideal, ya que facilita el almacenamiento, búsqueda y análisis de registros.</p>
    
    <p>En caso de desplegar en la nube, servicios como <strong>AWS CloudWatch</strong> pueden complementar el monitoreo, integrando métricas, logs y alertas en un solo panel. (Recomendado si el stack usa varios servicios AWS)</p>
    
    <h2>Estrategia de manejo de logs y métricas</h2>
    <p>Los microservicios deben emitir logs estructurados (JSON) y métricas expuestas en endpoints compatibles con Prometheus.</p>
    
    <p>Los logs se recolectan mediante agentes (por ejemplo, Filebeat o Fluentd) y se envían a Logstash para su procesamiento y almacenamiento en Elasticsearch.</p>
    
    <p>Las métricas se recolectan periódicamente con Prometheus y se visualizan en Grafana.</p>
    
    <p>Esta estrategia permite correlacionar eventos, identificar cuellos de botella y analizar el comportamiento del sistema en tiempo real.</p>
    
    <h2>Configuración de alertas y dashboards para detección de incidentes</h2>
    <p>Se deben configurar dashboards personalizados en Grafana y Kibana para visualizar el estado de los servicios, uso de recursos, tráfico y eventos relevantes.</p>
    
    <p>Las alertas automáticas deben establecerse en Prometheus y/o CloudWatch para detectar condiciones anómalas o comportamientos extraños (por ejemplo, caídas de servicios, uso excesivo de CPU/memoria, errores HTTP 5xx).</p>
    
    <p>Las alertas pueden enviarse por correo, Slack u otros canales, permitiendo una respuesta rápida ante incidentes y mejorando la operabilidad.</p>
</section>

<section id="seccion4" class="section">
    <h1>Automatización y ChatOps (1.5 puntos)</h1>
    
    <h2>Integración de herramientas de ChatOps (Slack + Hubot, Microsoft Teams)</h2>
    <p>Para mejorar la colaboración y la respuesta ante incidentes, se recomienda integrar herramientas de ChatOps como <strong>Slack</strong> junto a bots (por ejemplo, Hubot) o <strong>Microsoft Teams</strong> con sus respectivos conectores. Estas integraciones permiten ejecutar comandos, consultar el estado de los servicios y recibir notificaciones directamente desde los canales de comunicación del equipo.</p>
    
    <h2>Configuración de notificaciones automatizadas sobre estado del despliegue</h2>
    <p>El pipeline de CI/CD debe incluir pasos para enviar notificaciones automáticas a los canales de ChatOps seleccionados (Slack, Teams) cada vez que se realice un despliegue, se detecte un fallo o se complete una tarea crítica. Esto se puede lograr mediante integraciones nativas de GitHub Actions, Jenkins o scripts personalizados que utilicen webhooks o APIs de los servicios de mensajería.</p>
    
    <h2>Implementación de flujos de trabajo de ChatOps para gestión de incidentes</h2>
    <p>Se deben definir flujos de trabajo que permitan, desde el chat, ejecutar acciones como reiniciar servicios, consultar logs, escalar incidentes o crear tickets de soporte. Los bots pueden ser configurados para responder a comandos específicos y automatizar tareas repetitivas, mejorando la eficiencia y reduciendo el tiempo de respuesta ante incidencias.</p>
</section>
`;

// Función para cargar el contenido del informe
function loadInforme() {
    const contenedor = document.getElementById('informe-content');
    
    // Simular carga
    setTimeout(() => {
        contenedor.innerHTML = informeContent;
        contenedor.classList.add('loaded');
        updatePipelineStatus();
    }, 1000);
}

// Función para actualizar el estado del pipeline
function updatePipelineStatus() {
    const statusItems = document.querySelectorAll('.status-item');
    
    setTimeout(() => {
        // Cambiar el estado de "Tests" a exitoso
        const testStatus = statusItems[2].querySelector('.status-indicator');
        testStatus.classList.remove('warning');
        testStatus.classList.add('success');
        statusItems[2].querySelector('span:last-child').textContent = 'Tests: Exitoso';
    }, 2000);
}

// Función para generar y descargar PDF
function downloadPDF() {
    // Crear un nuevo elemento para el contenido del PDF
    const printContent = document.getElementById('informe-content').cloneNode(true);
    
    // Crear una nueva ventana para imprimir
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Informe - Plataforma de Navegación Portuaria</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    color: #2c5282;
                    border-bottom: 2px solid #63b3ed;
                    padding-bottom: 10px;
                }
                h2 {
                    color: #3182ce;
                    margin-top: 30px;
                    padding-left: 15px;
                    border-left: 4px solid #63b3ed;
                }
                h3 {
                    color: #2d3748;
                    margin-top: 20px;
                }
                p {
                    text-align: justify;
                    margin-bottom: 15px;
                }
                ul {
                    margin: 15px 0;
                    padding-left: 30px;
                }
                li {
                    margin-bottom: 8px;
                }
                strong {
                    color: #2c5282;
                }
                .section {
                    margin-bottom: 40px;
                    page-break-inside: avoid;
                }
                @page {
                    margin: 2cm;
                }
            </style>
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="border: none; margin: 0;">PortTrack - Informe Técnico</h1>
                <p style="font-size: 18px; color: #666;">Despliegue y Monitoreo Continuo para Plataforma de Navegación Portuaria</p>
                <p style="font-size: 14px; color: #999;">Generado el ${new Date().toLocaleDateString('es-ES')}</p>
            </div>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Esperar a que se cargue y luego imprimir
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Función para navegación suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el informe
    loadInforme();
    
    // Configurar botón de descarga PDF
    const downloadBtn = document.getElementById('downloadPdf');
    downloadBtn.addEventListener('click', downloadPDF);
    
    // Configurar navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Actualizar navegación activa al hacer scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Simular actualizaciones de estado en tiempo real
setInterval(() => {
    const timestamp = new Date().toLocaleTimeString('es-ES');
    console.log(`Pipeline status checked at ${timestamp}`);
}, 30000); // Cada 30 segundos
