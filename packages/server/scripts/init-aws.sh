#!/bin/sh
echo "Initializing aws localstack"

awslocal s3api create-bucket --bucket resala-files
awslocal s3api put-bucket-acl --bucket resala-files --acl public-read

awslocal ses verify-email-identity --email-address no-reply@resala.dev --region eu-north-1
