# Local K8s Development with CDKTF
The Cloud Development Kit for Terraform (CDKTF) allows you to manage Terraform configuration with code in your preferred programming language.

## FYI
- This is an example working off this tutorial from Hashicorp: [Deploy Applications with CDK for Terraform](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-applications).
- Deploys a second stack for the test environment.
- Utilizes a local Docker registry to store the application image.
- The application logic is a simplified version of the game 'tetris'. The application is written in TypeScript and compiled to JavaScript.
- The application is deployed as a Docker container on a local Kubernetes cluster using [kind](https://kind.sigs.k8s.io/).
- The application is exposed via a NodePort service.
- The application is deployed to a test environment using a second stack.3

## Prerequisites
- [NPM (v8.19+)](https://www.npmjs.com/get-npm)
- [NodeJS (v18+)](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [Terraform (v1.2+)](https://www.terraform.io/downloads.html)
- [CDK for Terraform (v0.15+)](https://github.com/cdktf)

## Resources
- [CDK for Terraform Getting Started](https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf)
- [CDK for Terraform Tutorial](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-applications)
- [CDK for Terraform GitHub](https://github.com/hashicorp/terraform-cdk)
- [CDK for Terraform Documentation](https://www.terraform.io/docs/cdktf/index.html)