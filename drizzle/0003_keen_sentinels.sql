CREATE TABLE "user_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"technologies" json,
	"status" varchar(50) DEFAULT 'active',
	"progress" varchar(10) DEFAULT '0',
	"start_date" timestamp,
	"end_date" timestamp,
	"github_url" text,
	"live_url" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
