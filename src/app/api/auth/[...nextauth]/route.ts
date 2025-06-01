import { handlers } from '../../../../../auth';

// Configure for dynamic runtime and CSRF handling
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { GET, POST } = handlers;
