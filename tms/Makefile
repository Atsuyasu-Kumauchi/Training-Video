# Start all services
start:
	@echo "Starting TMS services..."
	docker-compose up -d
	@echo "Services started!"

# Stop all services
stop:
	@echo "Stopping TMS services..."
	docker-compose down
	@echo "Services stopped!"

# View logs
logs:
	@echo "Viewing logs (Ctrl+C to exit)..."
	docker-compose logs -f

# Clean everything
clean:
	@echo "Cleaning up TMS services..."
	docker-compose down -v --remove-orphans
	@echo "Cleanup complete!"

# Restart all services
restart:
	@echo "Restarting TMS services..."
	docker-compose restart
	@echo "Services restarted!"

# Update dependencies
npm-update:
	@echo "Updating dependencies inside containers..."
	docker-compose exec api npm update
	docker-compose exec web npm update
	@echo "Dependencies updated!"

# Seed database
seed:
	@echo "Seeding database..."
	docker exec -i tvms-db psql -U tvms_user -d tvms_db < db/seed.sql
	@echo "Database seeded!"

# Install Swagger and restart API (if needed)
docs-setup:
	@echo "Installing Swagger package..."
	@docker-compose exec api npm install @nestjs/swagger@^11.0.0 || true
	@echo "Restarting API..."
	@docker-compose restart api
	@echo "Waiting for API to start..."
	@sleep 5
	@echo "Swagger : http://localhost:7001/api-docs"

# Generate API documentation
docs:
	@echo "Checking if API is running..."
	@docker ps --filter "name=tvms-api" --format "{{.Names}}" | grep -q tvms-api || (echo "❌ API container is not running. Run: docker-compose up -d api" && exit 1)
	@echo "Generating API documentation..."
	@node api_docs/generate-docs.js --host http://localhost:7001
	@echo "Documentation generated in api_docs/"
