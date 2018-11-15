#!/usr/bin/env bash

set -e

npm run build
cd dist/
zip -r artifact css/ img/ index.html
curl -F artifact=@./artifact.zip -F project=$MOLLY_PROJECT -F token=$MOLLY_TOKEN $MOLLY_URL"/deploy"
