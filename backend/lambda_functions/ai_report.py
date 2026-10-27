import json
import boto3
import os

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def lambda_handler(event, context):
    body = json.loads(event.get('body', '{}'))
    intern_name = body.get('intern_name', 'Intern')
    metrics = body.get('metrics', {'Code Quality': 5, 'Communication': 4})
    
    prompt = f"""
    You are an expert HR Executive. Write a professional, concise 3-paragraph 
    performance summary for junior engineer {intern_name} based on these scores:
    {json.dumps(metrics)}
    """
    
    # Payload format for Amazon Bedrock Claude model
    payload = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 300,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    try:
        response = bedrock.invoke_model(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",
            body=json.dumps(payload)
        )
        response_body = json.loads(response.get('body').read())
        ai_text = response_body.get('content', [{}])[0].get('text', '')
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"status": "success", "summary": ai_text})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"status": "error", "message": str(e)})
        }
