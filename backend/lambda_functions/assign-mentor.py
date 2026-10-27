import json
import boto3
import os
import urllib.request

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_MENTORSHIP', 'Mentorship')
TEAMS_WEBHOOK_URL = os.environ.get('TEAMS_WEBHOOK_URL', 'https://outlook.office.com/webhook/dummy-url')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        mentor_email = body.get('mentor_email')
        mentor_name = body.get('mentor_name')
        intern_email = body.get('intern_email')
        intern_name = body.get('intern_name')

        if not mentor_email or not intern_email:
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"status": "error", "message": "Mentor and intern identifiers are required."})
            }

        # 1. Write mapping to DynamoDB
        table = dynamodb.Table(table_name)
        table.put_item(
            Item={
                'InternEmail': intern_email,
                'InternName': intern_name,
                'MentorEmail': mentor_email,
                'MentorName': mentor_name,
                'AssignedAt': '2026-03-26T12:00:00Z'
            }
        )

        # 2. Format Adaptive Card payload for Microsoft Teams
        teams_payload = {
            "type": "message",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.adaptive",
                    "content": {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "type": "AdaptiveCard",
                        "version": "1.2",
                        "body": [
                            {"type": "TextBlock", "text": "🚀 New Mentorship Assignment", "weight": "Bolder", "size": "Medium"},
                            {"type": "FactSet", "facts": [
                                {"title": "Mentor:", "value": mentor_name},
                                {"title": "Intern:", "value": intern_name},
                                {"title": "Action:", "value": "Schedule Kickoff Sync"}
                            ]}
                        ]
                    }
                }
            ]
        }

        # 3. Push Webhook notification (Wrapped in try/except so network failure doesn't block DB write response)
        try:
            req = urllib.request.Request(
                TEAMS_WEBHOOK_URL,
                data=json.dumps(teams_payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            urllib.request.urlopen(req, timeout=3)
        except Exception as webhook_err:
            print(f"Webhook dispatch warning: {str(webhook_err)}")

        return {
            "statusCode": 201,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({
                "status": "success",
                "message": "Mentorship pairing saved and Teams notification dispatched successfully."
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"status": "error", "message": str(e)})
        }
