#!/bin/bash
set -e

echo "Starting deployment…"
# Example build
docker build -t quantum-app:latest .
# Example apply
kubectl apply -f kubernetes/
