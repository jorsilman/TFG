#!/bin/bash
# Script para esperar a que la base de datos esté lista

set -e

host="$1"
shift
cmd="$@"

until mysqladmin ping -h "$host" --silent; do
  echo 'Esperando a que la base de datos esté disponible...'
  sleep 1
done

>&2 echo "La base de datos está lista, ejecutando el comando: $cmd"
exec $cmd
