#! /bin/bash

set -euxo pipefail

rm -f lambda.zip
zip lambda.zip -r *

aws --region us-east-1 lambda update-function-code --function-name arn:aws:lambda:us-east-1:759167017735:function:JazCom --zip-file fileb://lambda.zip
