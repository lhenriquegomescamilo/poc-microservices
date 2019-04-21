#!/bin/sh

# Criando volme de persistencia
kubectl apply -f 01-jenkins-pv-pvc.yaml


# Instalando o jenkins no cluster
helm install --name jenkins --set Persistence.ExistingClaim=jenkins --set Master.ServiceType=NodePort --set Master.NodePort=30808 --namespace devops stable/jenkin

# Criando role do service account e fazendo binding com o jenkins no name space devops
kubectl create rolebinding sa-devops-role-clusteradmin --clusterrole=cluster-admin --serviceaccount=devops:default --namespace=devops


# Criando role binding e service account para o jenkins ter permissão de admin no namespace kube-system
kubectl create rolebinding sa-devops-role-clusteradmin-kubesystem --clusterrole=cluster-admin --serviceaccount=devops:default --namespace=kube-system
