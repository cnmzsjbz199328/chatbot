## Error Type
Build Error

## Error Message
  × Expected ';', got 'default'

## Build Output
./src/components/UploadContainer.tsx
Error:   × Expected ';', got 'default'
    ╭─[C:\learn-git\chatbot\src\components\UploadContainer.tsx:62:1]
 59 │         </div>
 60 │     )
 61 │ }
 62 │ export default UploadContainert default UploadContainer
    ·                                 ───────
    ╰────

Caused by:
    Syntax Error

Next.js version: 15.5.2 (Webpack)

[{
	"resource": "/c:/learn-git/chatbot/src/components/UploadContainer.tsx",
	"owner": "typescript",
	"code": "2552",
	"severity": 8,
	"message": "Cannot find name 'UploadContainert'. Did you mean 'UploadContainer'?",
	"source": "ts",
	"startLineNumber": 62,
	"startColumn": 16,
	"endLineNumber": 62,
	"endColumn": 32,
	"relatedInformation": [
		{
			"startLineNumber": 10,
			"startColumn": 7,
			"endLineNumber": 10,
			"endColumn": 22,
			"message": "'UploadContainer' is declared here.",
			"resource": "/c:/learn-git/chatbot/src/components/UploadContainer.tsx"
		}
	],
	"origin": "extHost1"
},{
	"resource": "/c:/learn-git/chatbot/src/components/UploadContainer.tsx",
	"owner": "eslint3",
	"severity": 8,
	"message": "Parsing error: ';' expected.",
	"source": "eslint",
	"startLineNumber": 62,
	"startColumn": 32,
	"endLineNumber": 62,
	"endColumn": 32,
	"origin": "extHost1"
},{
	"resource": "/c:/learn-git/chatbot/src/components/UploadContainer.tsx",
	"owner": "typescript",
	"code": "1005",
	"severity": 8,
	"message": "';' expected.",
	"source": "ts",
	"startLineNumber": 62,
	"startColumn": 33,
	"endLineNumber": 62,
	"endColumn": 40,
	"origin": "extHost1"
}]