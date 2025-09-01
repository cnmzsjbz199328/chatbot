Received file: File {
  size: 149711,
  type: 'application/pdf',
  name: 'Cover Letter.pdf',
  lastModified: 1756715986328
}
Error uploading file: TypeError: Cannot read properties of undefined (reading 'map')
    at embedChunks (src\app\api\upload\route.ts:22:43)
    at POST (src\app\api\upload\route.ts:70:27)
  20 |     const model = 'multilingual-e5-large';
  21 |
> 22 |     const embeddings = await pc.inference.embed({
     |                                           ^
  23 |         model: model,
  24 |         inputs: chunks,
  25 |         parameters: {
 POST /api/upload 500 in 879ms

 [{
	"resource": "/c:/learn-git/chatbot/src/app/api/upload/route.ts",
	"owner": "typescript",
	"code": "2554",
	"severity": 8,
	"message": "Expected 2-3 arguments, but got 1.",
	"source": "ts",
	"startLineNumber": 22,
	"startColumn": 43,
	"endLineNumber": 22,
	"endColumn": 48,
	"relatedInformation": [
		{
			"startLineNumber": 49,
			"startColumn": 26,
			"endLineNumber": 49,
			"endColumn": 47,
			"message": "An argument for 'inputs' was not provided.",
			"resource": "/c:/learn-git/chatbot/node_modules/@pinecone-database/pinecone/dist/inference/inference.d.ts"
		}
	],
	"origin": "extHost1"
}]