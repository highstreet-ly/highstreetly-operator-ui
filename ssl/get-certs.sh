kubectl get secret crt-operator.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.crt"]' | tr -d '"' | base64 -d  > ssl/server.crt
kubectl get secret crt-operator.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.key"]' | tr -d '"' | base64 -d  > ssl/server.key
