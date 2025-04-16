export async function handle({ event, resolve }) {
    const sessionCookie = event.cookies.get('session');
    event.locals.user = sessionCookie ? JSON.parse(sessionCookie) : null;
    return resolve(event);
}