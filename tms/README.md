# TMS (Task Management System)

A full-stack task management system built with NestJS (API) and Next.js (Web).

## Quick Start

**After cloning from GitHub:**

```bash
# Option 1: Using Make (recommended)
make start

# Option 2: Using Docker directly
docker-compose up -d
```

Services will be running at:
- **Web App**: http://localhost:7000
- **API**: http://localhost:7001
- **PgAdmin**: http://localhost:7002

## Commands

### Using Make
```bash
make start    # Start all services
make stop     # Stop all services
make logs     # View logs
make clean    # Clean everything
make restart  # Restart services
```

### Using Docker directly
```bash
docker-compose up -d    # Start services
docker-compose down     # Stop services
docker-compose logs -f  # View logs
docker-compose down -v --remove-orphans  # Clean everything
```

## Requirements

- Docker and Docker Compose
- Make (optional, for make commands)

