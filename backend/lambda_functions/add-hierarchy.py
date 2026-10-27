import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_MENTORSHIP', 'Mentorship')

def lambda_handler(event, context):
    try:
        table = dynamodb.Table(table_name)
        response = table.scan()
        items = response.get('Items', [])

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "status": "success",
                "data": items
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"status": "error", "message": str(e)})
        }
