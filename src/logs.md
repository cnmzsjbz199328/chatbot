C:\Users\tj169>curl --request POST --url https://api.cohere.com/v2/chat --header "accept: application/json" --header "content-type: application/json" --header "Authorization: bearer LZm1ofmZmkR11EQo4WhKCHMlCueE8mKsmVAyAQju" --data "{\"model\": \"command-a-reasoning-08-2025\", \"messages\": [{\"role\": \"user\", \"content\": \"Hello world!\"}], \"thinking\": {\"type\": \"disabled\"}}"
{"id":"12b26e0e-17ea-40d9-a2b6-a308fbd3513a","message":{"role":"assistant","content":[{"type":"text","text":"Hello! It's great to see you. How can I assist you today? Whether you have a question, need help with a project, or just want to chat, I'm here to help!"}]},"finish_reason":"COMPLETE","usage":{"billed_units":{"input_tokens":3,"output_tokens":40},"tokens":{"input_tokens":498,"output_tokens":42}}}

[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"准确"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"和"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"最"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"新的"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"信息"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"content-delta","index":0,"delta":{"message":{"content":{"thinking":"。"}}}}.
Error message: [{"expected":"string","code":"invalid_type","path":["delta","message","content","text"],"message":"Invalid input"}]] { 
  value: [Object],
  [cause]: [Array]
}
[Error [AI_TypeValidationError]: Type validation failed: Value: {"type":"message-end","delta":{"finish_reason":"ERROR","usage":{},"error":"No valid response generated. Try updating messages"}}.        
Error message: [{"expected":"object","code":"invalid_type","path":["delta","usage","tokens"],"message":"Invalid input"}]] {
  value: [Object],
  [cause]: [Array]
}