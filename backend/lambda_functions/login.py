import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_USERS', 'InternDirectory')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        email = body.get('email')
        password = body.get('password')
        role = body.get('role')

        if not email or not role:
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"status": "error", "message": "Email and role are required fields."})
            }

        table = dynamodb.Table(table_name)
        response = table.get_item(Key={'InternEmail': email})

        if 'Item' not in response:
            return {
                "statusCode": 401,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"status": "error", "message": "User not found."})
            }

        user = response['Item']
        
        # Verify role matches record
        if user.get('Role') != role:
            return {
                "statusCode": 403,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"status": "error", "message": "Role mismatch authorization failure."})
            }

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({
                "status": "success",
                "message": "Authentication successful",
                "data": {
                    "name": user.get('Name'),
                    "email": user.get('InternEmail'),
                    "role": user.get('Role')
                }
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"status": "error", "message": str(e)})
        }
