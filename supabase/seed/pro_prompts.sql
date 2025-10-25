-- Professional prompts for Drive Labs application
-- This file contains AI prompts and copy for the application

-- Insert professional prompts for different contexts
INSERT INTO prompts (id, category, context, prompt_text, created_at, updated_at) VALUES
(
  'auth-welcome',
  'authentication',
  'login_page',
  'Welcome back! Sign in to continue building amazing projects with Drive Labs.',
  NOW(),
  NOW()
),
(
  'auth-signup',
  'authentication', 
  'signup_page',
  'Join Drive Labs and start creating professional applications in minutes.',
  NOW(),
  NOW()
),
(
  'dashboard-empty',
  'dashboard',
  'empty_state',
  'Ready to build something amazing? Create your first project to get started.',
  NOW(),
  NOW()
),
(
  'project-create',
  'projects',
  'create_modal',
  'Give your project a name and description. We''ll handle the rest.',
  NOW(),
  NOW()
),
(
  'project-success',
  'projects',
  'success_message',
  'Project created successfully! Your application is being generated.',
  NOW(),
  NOW()
),
(
  'error-generic',
  'errors',
  'generic_error',
  'Something went wrong. Please try again or contact support if the issue persists.',
  NOW(),
  NOW()
),
(
  'error-network',
  'errors',
  'network_error',
  'Connection lost. Please check your internet connection and try again.',
  NOW(),
  NOW()
),
(
  'loading-generic',
  'loading',
  'generic_loading',
  'Please wait while we process your request...',
  NOW(),
  NOW()
),
(
  'loading-project',
  'loading',
  'project_loading',
  'Generating your project. This may take a few moments.',
  NOW(),
  NOW()
),
(
  'nav-dashboard',
  'navigation',
  'main_nav',
  'Dashboard',
  NOW(),
  NOW()
),
(
  'nav-projects',
  'navigation',
  'main_nav',
  'Projects',
  NOW(),
  NOW()
),
(
  'nav-settings',
  'navigation',
  'main_nav',
  'Settings',
  NOW(),
  NOW()
),
(
  'cta-primary',
  'buttons',
  'primary_action',
  'Get Started',
  NOW(),
  NOW()
),
(
  'cta-secondary',
  'buttons',
  'secondary_action',
  'Learn More',
  NOW(),
  NOW()
),
(
  'cta-cancel',
  'buttons',
  'cancel_action',
  'Cancel',
  NOW(),
  NOW()
),
(
  'cta-save',
  'buttons',
  'save_action',
  'Save Changes',
  NOW(),
  NOW()
),
(
  'cta-delete',
  'buttons',
  'delete_action',
  'Delete',
  NOW(),
  NOW()
),
(
  'form-email',
  'forms',
  'email_field',
  'Email address',
  NOW(),
  NOW()
),
(
  'form-password',
  'forms',
  'password_field',
  'Password',
  NOW(),
  NOW()
),
(
  'form-project-name',
  'forms',
  'project_name_field',
  'Project name',
  NOW(),
  NOW()
),
(
  'form-project-desc',
  'forms',
  'project_description_field',
  'Project description',
  NOW(),
  NOW()
),
(
  'validation-required',
  'validation',
  'required_field',
  'This field is required',
  NOW(),
  NOW()
),
(
  'validation-email',
  'validation',
  'email_format',
  'Please enter a valid email address',
  NOW(),
  NOW()
),
(
  'validation-password',
  'validation',
  'password_strength',
  'Password must be at least 8 characters long',
  NOW(),
  NOW()
),
(
  'success-saved',
  'success',
  'save_success',
  'Changes saved successfully',
  NOW(),
  NOW()
),
(
  'success-deleted',
  'success',
  'delete_success',
  'Item deleted successfully',
  NOW(),
  NOW()
),
(
  'success-created',
  'success',
  'create_success',
  'Item created successfully',
  NOW(),
  NOW()
);

-- Create prompts table if it doesn't exist
CREATE TABLE IF NOT EXISTS prompts (
  id VARCHAR(50) PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  context VARCHAR(50) NOT NULL,
  prompt_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_context ON prompts(context);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at);
