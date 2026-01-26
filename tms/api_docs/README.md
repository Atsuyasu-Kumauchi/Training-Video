# API Documentation

This folder contains Swagger API documentation for the TMS (Training Management System) API.

## Accessing Swagger UI

When the API is running, you can access the interactive Swagger documentation at:

- **Local Development**: `http://localhost:3001/api-docs`
- **Docker**: `http://localhost:7001/api-docs`

## Generating Static Documentation

You can generate static Swagger documentation files using one of these methods:

### Using Makefile (Recommended)
```bash
cd /Users/alimonkarim/Desktop/project/Training-Video/tms
make docs
```

### Using Node Script Directly
```bash
cd /Users/alimonkarim/Desktop/project/Training-Video/tms
node api_docs/generate-docs.js
```

### With Custom Port/Host
```bash
node api_docs/generate-docs.js --port 3001
node api_docs/generate-docs.js --host http://localhost:7001
```

This will generate:
- `swagger.json` - OpenAPI specification in JSON format

## Notes

- Swagger auto-discovers all API routes without requiring decorators
- JWT Bearer authentication is configured for protected endpoints
- Documentation is generated automatically when the API starts
- Generated files are ignored by git (see `.gitignore`)
