# HTML Pages List for In-house Training Video Management System

## Folder Structure: Admin & Students

### Admin Folder
Pages accessible only to administrators and section managers

#### Authentication & User Management
1. **login.html** - Administrator login page with MFA
2. **mfa-setup.html** - Multi-factor authentication setup
3. **mfa-verify.html** - Multi-factor authentication verification

#### Dashboard & Main
4. **admin-dashboard.html** - Administrator main dashboard with system overview
5. **admin-home.html** - Admin landing page with quick access to management features

#### User Management
6. **user-management.html** - Main user management dashboard
7. **user-list.html** - List all users with search and filter
8. **user-create.html** - Create new user page
9. **user-edit.html** - Edit user information page
10. **user-groups.html** - User group management page
11. **bulk-user-import.html** - CSV import page for bulk user registration
12. **user-roles.html** - Role management page for administrators

#### Video Management
13. **video-upload.html** - Administrator page for uploading new training videos
14. **video-edit.html** - Administrator page for editing video metadata
15. **video-categories.html** - Category management page for administrators
16. **video-management.html** - Video management dashboard

#### Training & Assessment Management
17. **confirmation-test-create.html** - Administrator page for creating confirmation tests
18. **confirmation-test-list.html** - Administrator page for managing confirmation tests
19. **confirmation-test-results.html** - View confirmation test results and completion status
20. **assignment-report-create.html** - Administrator page for creating assignment reports
21. **assignment-report-list.html** - Administrator page for managing assignment reports
22. **assignment-report-submissions.html** - View assignment report submissions and status

#### Administrative Functions
23. **reports.html** - Report generation and export page
24. **notification-settings.html** - Slack notification configuration page
25. **system-settings.html** - System configuration page
26. **log-viewer.html** - System and user operation logs viewer
27. **backup-management.html** - Data backup and recovery management page
28. **slack-integration.html** - Slack integration configuration page

#### Error & Status Pages
29. **admin-unauthorized.html** - Access denied page for admin functions
30. **admin-maintenance.html** - System maintenance page

---

### 📁 Students Folder
Pages accessible to all employees (students)

#### Authentication & User Management
31. **login.html** - User login page with ID/password authentication
32. **forgot-password.html** - Password reset request page
33. **reset-password.html** - Password reset confirmation page

#### Dashboard & Main
34. **dashboard.html** - Main dashboard showing training progress, completion status, and notifications
35. **home.html** - Landing page after login with quick access to features

#### Video Management
36. **video-list.html** - Display all training videos with search and filter functionality
37. **video-player.html** - Video playback page with progress tracking and resume functionality
38. **video-detail.html** - Detailed video information page
39. **search-results.html** - Search results page for videos and content
40. **category-browse.html** - Browse videos by category page

#### Training & Assessment
41. **training-history.html** - User's training completion history
42. **confirmation-test.html** - Confirmation test taking page
43. **assignment-report.html** - Assignment report submission page

#### Profile & Settings
44. **profile.html** - User profile management page
45. **settings.html** - User settings page
46. **change-password.html** - Password change page

#### Notifications
47. **notifications.html** - User notification center

#### Error & Status Pages
48. **404.html** - Page not found error page
49. **500.html** - Server error page
50. **unauthorized.html** - Access denied page
51. **maintenance.html** - System maintenance page

---

## Shared Components (Both Folders)
- Navigation components
- Header and footer
- Common UI components
- Error handling components

## Mobile Responsive Considerations
All pages should be responsive and work on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Tablet devices

## Additional Considerations
- All pages should support the required browser compatibility
- Pages should be optimized for performance (video loading under 3 seconds)
- Accessibility features should be implemented
- Pages should support the scalability requirements (up to 1000 simultaneous users)
- Integration with AWS services (RDS, S3) should be considered in the design

## Page Count Summary
- **Admin Folder**: 30 pages
- **Students Folder**: 21 pages
- **Total**: 51 HTML pages

## Key Features by Folder

### Admin Folder Features:
- User management and bulk registration
- Video upload and management
- Confirmation test and assignment report creation
- System administration and reporting
- Slack integration management
- Log viewing and backup management

### Students Folder Features:
- Video viewing and progress tracking
- Training history and completion status
- Confirmation test taking
- Assignment report submission
- Profile and settings management
- Notification center 