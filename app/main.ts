import { Construct } from "constructs"
import { App, TerraformStack } from "cdktf"
import * as kubernetes from "@cdktf/provider-kubernetes"
import * as path from "path"
import { SimpleKubernetesWebApp, SimpleKubernetesWebAppConfig,} from "./constructs"
  


// class MyStack extends TerraformStack {
//   constructor(scope: Construct, name: string) {
//     super(scope, name)

//     new kubernetes.provider.KubernetesProvider(this, 'kind', {
//       configPath: path.join(__dirname, '../kubeconfig.yaml'),
//     })

//     const app_backend = new SimpleKubernetesWebApp(this, 'app_backend', {
//       image: 'localhost:5000/nocorp-backend:latest',
//       replicas: 1,
//       port: 30002,
//       app: 'myapp',
//       component: 'backend',
//       environment: 'dev',
//     })
    

//     new SimpleKubernetesWebApp(this, 'app_frontend', {
//       image: 'localhost:5000/nocorp-frontend:latest',
//       replicas: 3,
//       port: 30001,
//       app: 'myapp',
//       component: 'frontend',
//       environment: 'dev',
//       env: { BACKEND_APP_URL: `http://localhost:${app_backend.config.port}` },
//     })
    


//     // new KubernetesWebAppDeployment(this, 'deployment', {
//     //   image: 'nginx:latest',
//     //   replicas: 2,
//     //   app: 'myapp',
//     //   component: 'frontend',
//     //   environment: 'dev',
//     // })

//     // new KubernetesNodePortService(this, 'service', {
//     //   port: 30001,
//     //   app: 'myapp',
//     //   component: 'frontend',
//     //   environment: 'dev',
//     // })
    

//     // new kubernetes.deployment.Deployment(this, "myapp", {
//     //   metadata: {
//     //     labels: {
//     //       app: 'myapp',
//     //       component: 'frontend',
//     //       environment: 'dev',
//     //     },
//     //     name: 'myapp',
//     //   },
//     //   spec: {
//     //     replicas: '1',
//     //     selector: {
//     //       matchLabels: {
//     //         app: 'myapp',
//     //         component: 'frontend',
//     //         environment: 'dev',
//     //       },
//     //     },
//     //     template: {
//     //       metadata: {
//     //         labels: {
//     //           app: 'myapp',
//     //           component: 'frontend',
//     //           environment: 'dev',
//     //         },
//     //       },
//     //       spec: {
//     //         container: [
//     //           {
//     //             image: 'nginx:latest',
//     //             name: 'frontend',
//     //           },
//     //         ],
//     //       },
//     //     },
//     //   },
//     // })
//   }
// }

class MyStack extends TerraformStack {
  constructor(
    scope: Construct,
    name: string,
    config: {
      frontend: SimpleKubernetesWebAppConfig
      backend: SimpleKubernetesWebAppConfig
    }
  ) {
    super(scope, name)

    new kubernetes.provider.KubernetesProvider(this, 'kind', {
      configPath: path.join(__dirname, '../kubeconfig.yaml'),
    })

    const app_backend = new SimpleKubernetesWebApp(
      this,
      'app_backend',
      config.backend
    )
    new SimpleKubernetesWebApp(this, 'app_frontend', {
      ...config.frontend,
      env: { BACKEND_APP_URL: `http://localhost:${app_backend.config.port}` },
    })
  }
}


const app = new App()
new MyStack(app, 'app', {
  frontend: {
    image: 'localhost:5000/nocorp-frontend:latest',
    replicas: 3,
    port: 30001,
    app: 'myapp',
    component: 'frontend',
    environment: 'dev',
  },
  backend: {
    image: 'localhost:5000/nocorp-backend:latest',
    replicas: 1,
    port: 30002,
    app: 'myapp',
    component: 'backend',
    environment: 'dev',
  },
})
new MyStack(app, 'app-test', {
  frontend: {
    image: 'localhost:5000/nocorp-frontend:latest',
    replicas: 4,
    port: 30003,
    app: 'myapp',
    component: 'frontend',
    environment: 'test',
  },
  backend: {
    image: 'localhost:5000/nocorp-backend:latest',
    replicas: 2,
    port: 30004,
    app: 'myapp',
    component: 'backend',
    environment: 'test',
  },
})

app.synth()